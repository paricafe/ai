import { bindThis } from '@/decorators.js';
import Module from '@/module.js';
import Message from '@/message.js';
import serifs from '@/serifs.js';
import { safeForInterpolate } from '@/utils/safe-for-interpolate.js';

const titles = ['桑', '酱', '喵', '大人'];

export default class extends Module {
	public readonly name = 'core';

	@bindThis
	public install() {
		return {
			mentionHook: this.mentionHook,
			contextHook: this.contextHook
		};
	}

	@bindThis
	private async mentionHook(msg: Message) {
		if (!msg.text) return false;

		return (
			this.transferBegin(msg) ||
			this.transferEnd(msg) ||
			this.setName(msg) ||
			this.modules(msg) ||
			this.version(msg)
		);
	}

	@bindThis
	private transferBegin(msg: Message): boolean  {
		if (!msg.text) return false;
		if (!msg.includes(['接管', '继承', '移动', '转移'])) return false;

		const code = msg.friend.generateTransferCode();

		msg.reply(serifs.core.transferCode(code));

		return true;
	}

	@bindThis
	private transferEnd(msg: Message): boolean  {
		if (!msg.text) return false;
		if (!msg.text.startsWith('「') || !msg.text.endsWith('」')) return false;

		const code = msg.text.substring(1, msg.text.length - 1);

		const succ = msg.friend.transferMemory(code);

		if (succ) {
			msg.reply(serifs.core.transferDone(msg.friend.name));
		} else {
			msg.reply(serifs.core.transferFailed);
		}

		return true;
	}

	@bindThis
	private setName(msg: Message): boolean  {
		if (!msg.text) return false;
		if (!msg.text.includes('叫我')) return false;
		// if (msg.text.startsWith('叫我')) return false;

		const name = msg.text.match(/叫我(.+?)$/g)![1];

		if (name.length > 10) {
			msg.reply(serifs.core.tooLong);
			return true;
		}

		if (!safeForInterpolate(name)) {
			msg.reply(serifs.core.invalidName);
			return true;
		}

		const withSan = titles.some(t => name.endsWith(t));

		if (withSan) {
			msg.friend.updateName(name);
			msg.reply(serifs.core.setNameOk(name));
		} else {
			msg.reply(serifs.core.san).then(reply => {
				this.subscribeReply(msg.userId, reply.id, {
					name: name
				});
			});
		}

		return true;
	}

	@bindThis
	private modules(msg: Message): boolean  {
		if (!msg.text) return false;
		if (!msg.or(['modules'])) return false;

		let text = '```\n';

		for (const m of this.ai.modules) {
			text += `${m.name}\n`;
		}

		text += '```';

		msg.reply(text, {
			immediate: true
		});

		return true;
	}

	@bindThis
	private version(msg: Message): boolean  {
		if (!msg.text) return false;
		if (!msg.or(['v', 'version', '版本'])) return false;

		msg.reply(`\`\`\`\nv${this.ai.version}\n\`\`\``, {
			immediate: true
		});

		return true;
	}

	@bindThis
	private async contextHook(key: any, msg: Message, data: any) {
		if (msg.text == null) return;

		const done = () => {
			msg.reply(serifs.core.setNameOk(msg.friend.name));
			this.unsubscribeReply(key);
		};

		if (msg.text.includes('是') || msg.text.includes('好')) {
			msg.friend.updateName(data.name + '桑');
			done();
		} else if (msg.text.includes('否') || msg.text.includes('不') || msg.text.includes('算了')) {
			msg.friend.updateName(data.name);
			done();
		} else {
			msg.reply(serifs.core.yesOrNo).then(reply => {
				this.subscribeReply(msg.userId, reply.id, data);
			});
		}
	}
}
