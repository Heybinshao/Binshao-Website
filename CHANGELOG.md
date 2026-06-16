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
