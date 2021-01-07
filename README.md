<h1><p align="center"><img src="./ai.svg" alt="藍" height="200"></p></h1>
<p align="center">An Ai for Misskey. <a href="使用教程.md">About Ai</a></p>

## 这是什么？
这是方便Misskey使用的日语（本repo为中文优化）Bot。

## 安装
> 您需要安装Node.js、npm和MeCab（可选）。

首先，做一个`git clone`到一个合适的目录。
接下来，在该目录下创建一个`config.json`文件。 内容应如下：
``` json
{
	"host": "https:// + あなたのインスタンスのURL (末尾の / は除く)",
	"i": "藍として動かしたいアカウントのアクセストークン",
	"master": "管理者のユーザー名(オプション)",
	"notingEnabled": "ランダムにノートを投稿する機能を無効にする場合は false を入れる",
	"keywordEnabled": "キーワードを覚える機能 (MeCab が必要) を有効にする場合は true を入れる (無効にする場合は false)",
	"chartEnabled": "チャート機能を無効化する場合は false を入れてください",
	"reversiEnabled": "藍とリバーシで対局できる機能を有効にする場合は true を入れる (無効にする場合は false)",
	"serverMonitoring": "サーバー監視の機能を有効にする場合は true を入れる (無効にする場合は false)",
	"checkEmojisEnabled": "カスタム絵文字チェック機能を有効にする場合は true を入れる (無効にする場合は false)",
	"checkEmojisAtOnce": "カスタム絵文字チェック機能で投稿をまとめる場合は true を入れる (まとめない場合は false)",
	"mecab": "MeCab のインストールパス (ソースからインストールした場合、大体は /usr/local/bin/mecab)",
	"mecabDic": "MeCab の辞書ファイルパス (オプション)",
	"memoryDir": "memory.jsonの保存先（オプション、デフォルトは'.'（レポジトリのルートです））"
}
```
您可以通过运行`npm install`、`npm run build`和`npm start`来启动。

## Dockerで動かす
まず適当なディレクトリに `git clone` します。
次にそのディレクトリに `config.json` を作成します。中身は次のようにします:
（MeCabの設定、memoryDirについては触らないでください）
``` json
{
	"host": "https:// + あなたのインスタンスのURL (末尾の / は除く)",
	"i": "藍として動かしたいアカウントのアクセストークン",
	"master": "管理者のユーザー名(オプション)",
	"notingEnabled": "ランダムにノートを投稿する機能を無効にする場合は false を入れる",
	"keywordEnabled": "キーワードを覚える機能 (MeCab が必要) を有効にする場合は true を入れる (無効にする場合は false)",
	"chartEnabled": "チャート機能を無効化する場合は false を入れてください",
	"reversiEnabled": "藍とリバーシで対局できる機能を有効にする場合は true を入れる (無効にする場合は false)",
	"serverMonitoring": "サーバー監視の機能を有効にする場合は true を入れる (無効にする場合は false)",
	"checkEmojisEnabled": "カスタム絵文字チェック機能を有効にする場合は true を入れる (無効にする場合は false)",
	"checkEmojisAtOnce": "カスタム絵文字チェック機能で投稿をまとめる場合は true を入れる (まとめない場合は false)",
	"mecab": "/usr/bin/mecab",
	"mecabDic": "/usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd/",
	"memoryDir": "data"
}
```
`docker-compose build` して `docker-compose up` すれば起動できます。
`docker-compose.yml` の `enable_mecab` を `0` にすると、MeCabをインストールしないようにもできます。（メモリが少ない環境など）

## フォント
一部の機能にはフォントが必要です。藍にはフォントは同梱されていないので、ご自身でフォントをインストールディレクトリに`font.ttf`という名前で設置してください。

## 记忆
藍使用内存数据库来保存记忆，它以`memory.json`为名持久地保存在藍的安装目录中。

## 开源许可证
MIT

## Awards
<img src="./WorksOnMyMachine.png" alt="Works on my machine" height="120">
