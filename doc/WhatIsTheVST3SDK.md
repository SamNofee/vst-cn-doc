# 什么是VST3 SDK



 **VST3 SDK解释**

VST软件开发工具包把VST开发相关的工具整合在一个包中，插件开发者可以用它开发符合VST3标准的软件，开发者还可以将它整合进诸如DAW或音频编辑器之类的宿主软件，以让宿主软件支持加载VST3插件。



> VST3 API文档包含在SDK的pluginterfaces/vst文件夹中，它里面有关于VST3 C++全部接口的定义与说明，通过它你可以进一步了解VST3插件和宿主之间的交互细节。
>
> 注：VST3 API文档不在此中文文档的翻译范围内



 **VST3 SDK包含以下模块**

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

在这个[链接](https://developer.steinberg.help/display/VST/VST+3+Links)里你可以下载VST的相关资料



**更新日志**

在这个[链接](https://developer.steinberg.help/display/VST/Change+History)里你可以查看VST3SDK的版本变动细节