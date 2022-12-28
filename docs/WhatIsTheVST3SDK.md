# 什么是 VST 3 SDK



 **VST 3 SDK 解释**

VST 软件开发工具包把 VST 开发相关的工具整合在一个包中，插件开发者可以用它开发符合 VST 3 标准的软件，开发者还可以将它整合进诸如 DAW 或音频编辑器之类的宿主软件，以让宿主软件支持加载 VST 3 插件。

> VST 3 API文档包含在SDK的 pluginterfaces/vst 文件夹中，它里面有关于 VST 3 C++全部接口的定义与说明，通过它你可以进一步了解 VST 3 插件和宿主之间的交互细节。
>
> 注：VST 3 API文档不在此中文文档的翻译范围内

 **VST 3 SDK 包含以下模块**

- AAX, AUv3, AU and VST 2 wrappers
- VST 3 Plug-ins Examples
- VST 3 Plug-in Test Host
- Validator command line
- AudioHost
- EditorHost
- VST3 Inspector
- VSTGUI
- VST 3 Project Generator
- iOS Inter-App Audio support
- VST 3 Licensing



**系统配置要求**

| 操作系统                         | 架构                       | 编译器                      | 备注                           |
| :------------------------------- | :------------------------- | :-------------------------- | :----------------------------- |
| Windows 10                       | x86, x86_64                | MSVC 2019, MSVC 2017        |                                |
| Windows 8.1                      | x86, x86_64                | MSVC 2019, MSVC 2017        |                                |
| macOS 10.13, 10.14, 10.15, 11.0  | x86, x86_64, Apple Silicon | Xcode 7, 8, 9, 10, 11, 12.2 |                                |
| iOS 13, iOS 14                   | arm64                      | Xcode 11, 12.2              |                                |
| Linux - Raspberry Pi OS (Buster) | arm32                      | GCC 8.3 and higher          | Visual Studio Code             |
| Linux - Ubuntu 18.04 LTS         | x86, x86_64                | GCC 8.3 and higher          | Visual Studio Code, Qt Creator |
| Linux - Ubuntu 20.04 LTS         | x86, x86_64                | GCC 8.3 and higher          | Visual Studio Code, Qt Creator |



**下载链接**

在这个[链接](https://developer.steinberg.help/display/VST/VST+3+Links)里你可以下载 VST 的相关资料



**更新日志**

在这个[链接](https://developer.steinberg.help/display/VST/Change+History)里你可以查看 VST 3SDK 的版本变动细节