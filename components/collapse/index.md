---
category: Data Display
title: Collapse折叠面板
---

可以折叠/展开的内容区域。

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。

## API

### Collapse

| 参数             | 说明                                         | 类型     | 默认值                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| activeKey        | 当前激活 tab 面板的 key| string[]\|string   | 默认无，accordion模式下默认第一个元素|
| defaultActiveKey | 初始化选中面板的 key | string   | 无 |
| onChange         | 切换面板的回调                               | Function | 无                              |
