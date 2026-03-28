# 代码规范文档

## 1. 目录结构

```
src
├── api         # API 请求
├── app.config.ts # 全局配置
├── app.css     # 全局样式
├── app.ts      # 入口文件
├── assets      # 静态资源
├── components  # 公共组件
├── index.html  # HTML 入口
├── pages       # 页面
│   ├── index   # 首页
│   ├── lobby   # 组队大厅
│   ├── profile # 个人页面
│   └── room    # 组队房间
├── store       # 状态管理
├── types       # TypeScript 类型定义
└── utils       # 工具函数
```

## 2. 命名规范

- **文件和目录**: 使用小写字母，多个单词用中划线 `-` 分隔 (kebab-case)。例如: `user-profile.tsx`。
- **组件**: 使用大驼峰命名 (PascalCase)。例如: `UserProfile`。
- **变量和函数**: 使用小驼峰命名 (camelCase)。例如: `getUserInfo`。
- **CSS 类名**: 使用小写字母和中划线。例如: `.user-profile`。

## 3. 代码风格

- 使用 Prettier 和 Stylelint 保证代码风格统一。
- TypeScript: 优先使用 `interface` 定义类型，使用 `type` 定义联合类型等。
- React:
    - 使用函数式组件和 Hooks。
    - 组件 props 需要明确类型定义。

## 4. Git 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档变更
- `style`: 代码风格 (不影响代码运行的变动)
- `refactor`: 重构
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动
