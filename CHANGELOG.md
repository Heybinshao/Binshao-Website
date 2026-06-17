# Binshao-Website 修改记录

> 记录自 2026-07-27 初始提交后的所有修改。

---

## 目录

1. [博客详情页（新增）](#1-博客详情页新增)
2. [边线/边框修复](#2-边线边框修复)
3. [UI 交互修复](#3-ui-交互修复)
4. [布局调整](#4-布局调整)
5. [内容更新](#5-内容更新)
6. [其他](#6-其他)

---

## 1. 博客详情页（新增）

| 文件 | 说明 |
|------|------|
| `src/app/(app)/(pages)/blog/[slug]/page.tsx` | 动态路由，博客文章详情页 |
| `src/app/(app)/(pages)/blog/[slug]/mdx-content.tsx` | react-markdown 渲染组件 |

### 详情页功能
- 顶部工具栏：`← Blog` 返回链接 + Copy Page + View Options + Share + 上下篇导航
- 封面图渲染（可选，1200×630px 圆角 + 内阴影）
- 标题、日期、标签展示
- prose 正文渲染（代码块、列表、引用、图片等）
- 底部导航：返回 + 上下篇切换
- SEO：Breadcrumb JSON-LD、OG/Twitter 卡片、canonical URL

### 分隔布局（从顶部到底部）

```
screen-line-before（装饰线）
stripe-divider screen-line-after（斜纹+横线，大分隔）
工具栏（screen-line-after 底线）
stripe-divider screen-line-after（斜纹+横线）
封面图（可选）
标题 + 日期 + 标签（screen-line-after 底线）
stripe-divider screen-line-after h-4（斜纹+横线，标题与正文间隔）
正文（screen-line-after 底线）
stripe-divider screen-line-after h-4（斜纹+横线，正文与底部间隔）
底部工具条（screen-line-after 底线）
stripe-divider h-8（斜纹，无线，与 footer 隔离）
```

---

## 2. 边线/边框修复

### 2.1 博客页左右边线重叠
- **问题**：`(pages)/layout.tsx` 已有 `border-x border-line`，`blog/page.tsx` 的容器又重复 `border-x border-edge`，同一宽度下 2px 重叠
- **修复**：`blog/page.tsx` 主容器移除 `border-x border-edge md:max-w-3xl`，只保留 `min-h-svh`

### 2.2 页脚图标区边框重叠
- **问题**：footer 的外层容器有 `border-x border-edge`，内层图标行容器也有 `border-x border-edge`，2px 粗线
- **修复**：footer 内层容器移除 `border-x border-edge`

### 2.3 PostList screen-line-after 与 footer screen-line-before 重叠
- **问题**：PostList 的 `screen-line-after`（底部横线）与 footer 的 `screen-line-before`（顶部横线）在同一 Y 坐标 → 2px 粗线
- **修复**：移除 PostList 的 `screen-line-after`。后来在博客页底部统一加 `stripe-divider h-8` 隔离，重新加回 `screen-line-after`

### 2.4 页脚 RSS 注释掉
- **问题**：RSS 链接显示但 RSS feed 未实现
- **修复**：`site-footer.tsx` 中将 RSS 链接注释掉，标注「暂不启用」

---

## 3. UI 交互修复

### 3.1 导航栏主题切换高亮过渡
- **问题**：顶部导航「主页」「博客」链接有 `transition-[color] duration-300`，切换主题时文字颜色平滑过渡产生闪烁
- **修复**：移除 `transition-[color] duration-300`

### 3.2 移动端汉堡菜单跳转后不关闭
- **问题**：点击移动端汉堡菜单内的导航链接后，Popover 弹窗不自动关闭
- **修复**：导航链接添加 `onClick` 处理器，触发 Escape 键盘事件关闭 Popover

### 3.3 博客描述 text-balance
- **问题**：博客页描述段落使用 `text-balance`（text-wrap: balance），在某些宽度下换行异常
- **修复**：移除 `text-balance` class

### 3.4 404 页书法 SVG 移动端溢出
- **问题**：BinshaoMark SVG `h-20`（80px），移动端屏幕窄时显示不全
- **修复**：`h-14 w-auto sm:h-20`（移动端 56px，桌面恢复 80px）

---

## 4. 布局调整

### 4.1 博客页底部 Stripe 分隔
- 标题与正文之间：`stripe-divider screen-line-after h-4`
- 正文与底部工具条之间：`stripe-divider screen-line-after h-4`
- 底部工具条与 footer 之间：`stripe-divider h-8`（无线，隔离线）

### 4.2 博客描述区 padding 调整
- **原**：`p-4`（16px 四周）
- **改**：`px-3 py-4 sm:px-4`（移动端 12px 左右，桌面 16px）

### 4.3 页脚 Blog 返回链接图标间距
- `gap-1` → `gap-2`

---

## 5. 内容更新

| 文件 | 说明 |
|------|------|
| `src/features/doc/content/rive-button-preview.mdx` | 标题从「在网页中嵌入并预览一个 Rive 交互按钮动画」改为「交互按钮动画」 |
| `src/features/doc/content/swap-button-animation.mdx` | 新增博客文章「交换按钮动画」 |

---

## 6. 其他

### 6.1 博客详情页归入手册
知识库 `00｜知识库/06｜Binshao-Website/` 下创建使用手册，涵盖：
- 新增博客文章、修改封面/标签
- 修改个人信息/滚动内容/社交链接
- 新增页面路由
- 导航/页脚/主题/字体配置
- 常用命令与 Git 提交流程

### 6.2 Git 历史清理
- 使用 orphan branch 方式清空历史，只剩 1 个初始 commit
- Vercel 部署记录不受影响

### 6.3 Vercel 旧部署清理
- 删除 117 个历史部署记录，仅保留最新 1 个

---

## 7. 工具栏改造

### 7.1 Copy Page 改为复制 MD 正文
- **旧**：`LLMCopyButtonWithViewOptions`（复制链接 + View Options 下拉菜单）
- **新**：`CopyMDButton`（`src/app/(app)/(pages)/blog/[slug]/copy-md-button.tsx`），点击直接复制文章的 Markdown 正文

### 7.2 分享按钮中文化
| 旧 | 新 |
|---|---|
| Copy link | 复制链接 |
| Share on X | 分享到 X |
| Share on LinkedIn | ❌ 移除 |
| — | ✅ 分享到微信（复制链接） |
| Other app | 其他应用 |

---

## 8. 图片代理

### 8.1 新增 `/api/img` 代理路由
- `src/app/api/img/route.ts`
- 服务端代理：用微信 User-Agent + Referer 请求微信 CDN，绕过跨域拦截
- 图片缓存一周（`Cache-Control: max-age=604800`）
- 视频流式传输支持
- 引用方式：`/api/img?url=ENCODED_WECHAT_URL`

### 8.2 封面图规范
- 封面图使用文章首图，不额外指定其他图片
- 代理 URL 必须包含 `wx_fmt=jpeg` / `wx_fmt=png` 参数，否则微信 CDN 返回 400

---

## 9. 边线/布局修复（后续轮次）

### 9.1 PostItem 卡片高度跟随网格行
- **问题**：PostItem 的 `<Link>` 没有 `h-full`，`screen-line-after` 底线定位在自身内容底部，当同行另一卡片标题更长时，底线不跟随网格行高下移
- **修复**：PostItem 的 `<Link>` 添加 `h-full`

### 9.2 Footer 上方统一定位
- 博客页：`PostList(screen-line-after)` → `screen-line-before`（横线） → `stripe-divider h-8` → `footer screen-line-before`
- 详情页：底部工具条 `(screen-line-after)` → `stripe-divider h-8` → `footer screen-line-before`
- 主页：`StripeSeparator`（自带的 h-8 斜纹+边框）→ `footer screen-line-before`

### 9.3 主页博客版块去重边线
- **问题**：`<li>` 有 `screen-line-top/bottom`，PostItem 的 `<Link>` 也有 `screen-line-before/after`，两套 ::before/::after 同一位置 → 2px
- **修复**：移除 `<li>` 上的边线，仅保留 PostItem 自身

### 9.4 详情页底部边线重叠
- **问题**：底部工具条 `screen-line-after` + 外部 `screen-line-before` 同一 Y 坐标 → 2px
- **修复**：移除外部 `screen-line-before`，仅保留 toolbar 底线 + stripe + footer 线

---

## 10. 内容更新（最终）

### 当前博客文章
| slug | 标题 | 来源 |
|------|------|------|
| `bzbs-ppt-plugin` | 受不了了！我给自己写了个PPT插件 | 公众号转载 |
| `office-tool-plus` | 还在苦苦寻找OFFICE安装包？快试试这个神器工具 | 公众号转载 |

### 已移除的 huazi 文章
`ai-tools-website-workflow`, `blueweekly-to-design-stroll`, `design-stroll-2025-review`, `design-stroll-workflow`, `ios-widgets-web-statistics`, `rive-button-preview`, `rive-preview-plugin-retrospective`, `wechat-coze-aianswer`

---

## 11. 文章提取与渲染优化

### 11.1 公众号文章提取流程
从微信公众平台 HTML 提取文章并转为 Markdown 的流程（`html_to_md`）：
1. 去除微信专用包装标签（section/span/mp-common）
2. 转换代码块（`<pre><code>` → ` ``` `）
3. 转换标题（h2/h3 → ##/###）
4. 转换加粗/斜体（strong/em → **/*）
5. 转换图片为代理 URL（`/api/img?url=...%3Fwx_fmt%3Dxxx`）
6. 转换列表（嵌套 ul/li 保留缩进层级）
7. 转换表格（thead/tbody/tr/th/td → `| --- |`）
8. 转换引用（blockquote → `>`）
9. 转换分割线/换行/段落
10. 清理残留 HTML 标签
11. 列表/表格后补空白行防渲染粘连

### 11.2 Markdown 渲染组件
`src/app/(app)/(pages)/blog/[slug]/mdx-content.tsx`

使用 `react-markdown` + `remarkGfm` + `rehypeSlug`，自定义覆盖以下组件：

| 组件 | 渲染方式 |
|------|---------|
| `table` | `w-full` 包裹 `overflow-x-auto`，`border-collapse border border-edge` |
| `thead` | `bg-muted/50` + `border-b` 表头底边 |
| `tr` | `border-b border-edge`，最后一行无底边 |
| `th`/`td` | `border-r` 右边框 + `px-3 py-2`，最后一列无边 |
| `pre` | 圆角边框 + `bg-muted/30` + `p-4` + `text-foreground` + `whitespace-pre-wrap` 自动换行 |
| `code`（行内） | 圆角边框 + `bg-muted/50` + `px-1.5`，通过 `\n` 检测区分块级/行内 |
| `blockquote` | `border-l-4 border-line pl-4 text-muted-foreground` |
| `h2`/`h3` | 自定义字号 + `font-semibold tracking-tight` |
| `hr` | `border-line` |

### 11.3 修复记录

| 问题 | 原因 | 修复 |
|------|------|------|
| 列表项丢失（9→53） | li 处理顺序错误（`</li>` 先于 `<li>` 匹配被替换） | 先匹配 `<li>...</li>` 再替换 `</li>` |
| 列表内加粗丢失 | 列表处理时 strip 了 HTML 标签 | 先处理 `<strong>` 再处理 `<li>` |
| 多层级列表变平 | 未追踪 ul 嵌套深度 | `_process_lists` 追踪 depth 并加缩进 |
| 列表/表格后内容粘连 | 缺少空白行分隔 | 自动在列表/表格结束后补空白行 |
| 代码块颜色太浅 | 未设置 `text-foreground` | 添加 `text-foreground` |
| 代码块不可换行 | `pre` 默认 `white-space: pre` | 改用 `whitespace-pre-wrap break-words` |
| 表格边框重叠 | `border` 全包围导致 | 改用 `border-r` + `last:border-r-0`，行底边用 `tr border-b` |
| 行号污染 | `read_file` 返回带行号内容，直接写回 | 改为 `open()` 直接读写，绕过 `read_file` |

### 11.4 文章首图规范
- 封面图使用文章第一篇图片
- 正文中移除该图片（避免封面与正文重复）
- BZBS 文章：✅ 已移除
- OTP 文章：✅ 已移除

