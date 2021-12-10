[TOC]

下面的开发文档涉及到全部你在开发VST3插件过程中的方方面面。



# 什么是VST



**VST3：虚拟工作室技术的一种新标准**

1996年，[Steinberg](https://www.steinberg.net/)在插件化与虚拟乐器技术领域建立了世界领先的、支持最广的标准：VST。之后Steinberg在不断优化升级过程中发布了新一代的虚拟工作室技术：VST3。VST3相较与VST是一个更加稳定、特性更丰富、更可靠的平台。这是世界领先技术团队Steinberg用20多年沉淀下来的成果。VST3为音乐行业的许多极具创造性、令人振奋的产品开发过程提供了相当有力的技术支持。VST3 SDK是一个免费的技术，对所有开发者开放。



**关于VST标准**

VST是数字音频领域的一场革命，由Steinberg研发并在1996年首次推出，VST为你的电脑创造了一个全面的、专业的工作室环境，你可以把各种虚拟效果器和虚拟乐器整合进来。你可以在VST系统中用软件的形式实现硬件效果器的各种有趣的效果。而且它可以和像数字音频工作站（DAW）之类的宿主软件无缝衔接，也可以轻易地和你的各类外部设备进行整合，提供一个为你自己量身定制的环境。作为一个开源标准，VST有着无限的可能性。Steinberg和其他公司仍在不断开发基于VST标准的效果器和虚拟乐器。



**从技术角度来看**

VST插件是在宿主软件中使用的一个处理组件，宿主给插件提供音频或事件流，插件接收并交给插件内的代码去处理。一般来说，VST插件可以获取音频数据，对数据进行处理并把结果返回给宿主软件。 VST插件通常使用电脑的处理器进行处理。 音频流会被分成块，宿主会按照某种序列供应这些块，宿主和它当前的环境决定这些块的大小。VST插件要维护所有它自己与正在运行进程相关的参数状态，宿主不负责维护关于插件的任何信息，插件如何处理这些块与宿主无关。

从宿主软件的角度看, 插件是一个具有任意数量的输入、输出（MIDI或音频）和相关参数的黑匣子。宿主不需要插件进程的隐含知识就可以使用它。插件进程可以在进程内部使用它想要的任何参数，但是根据宿主的能力决定它是否可以被宿主自定义用户参数。

**VST** 插件的源代码与平台无关，但数据分发系统取决于平台架构：

- 在Windows上, VST插件是一个多线程DLL（动态链接库），可以打包进一个文件夹。
- 在Mac OS上，VST插件是一个Mach-O Bundle。
- 在Linux上，VST插件是一个包。



## 用例

**为什么要使用VST3 SDK**

这里有不同的使用情况以让你理解VST3 SDK:

1. 你是一名插件开发者，并且想要创建可以在 VST 3 宿主中运行的音频 FX 或乐器插件。

   - 音频FX插件是一个依靠音频输入并输出经处理后音频的插件，例如延迟、混响、压缩等。

   - 乐器插件是声音/音频生成器，将音符事件作为输入并创建音频输出：例如著名硬件合成器的仿真。有两种乐器插件：*虚拟采样器*（使用音频样本作为声音生成的基础）和 *虚拟合成器*（使用不同类型的合成：物理建模、加法、减法、FM、基于样本……）

2. 你是 ***宿主开发人员*** 并且想在你的应用程序中加载 **VST 3** 插件，例如audio FX 、乐器插件。



**VST3 SDK的优势**

直接使用 **VST 3 SDK**：

- 你一定要使用 **VST 3** 格式。
- 基于 **VST 3** 格式开发插件可以让您轻松支持新的 **VST 3** 特性，从而让这些插件在 DAW 中的更好地被集成。一些第三方SDK仅使用一般插件格式之间的公共层，以这种方式开发的插件很难被更好地集成，例如高级的 **VST 3** 功能：
   - [上下文菜单](https://developer.steinberg.help/display/VST/[3.5.0]+Context+Menu+Support)
   - [dirty state](https://developer.steinberg.help/display/VST/[3.1.0]+UI+Group+Editing%2C+Dirty+State+and+Open+Editor+Request+Support)
   - 差异化加载预设或项目
   - [音符表达式](https://developer.steinberg.help/display/VST/[3.5.0]+Note+Expression+Support)
   - 查看[VST 3 的其他好处](https://developer.steinberg.help/display/VST/Main+benefits+of+VST+3)

- 你可以将 [**VSTGUI**](https://developer.steinberg.help/display/VST/Use+cases#Usecases-Vstgui)工具与 **VST 3**集成
- 它包含了主要的插件格式包装器，例如AAX、AUv3、AU、VST2（已弃用）
- [Validator](https://developer.steinberg.help/display/VST/Use+cases#Usecases-validator)允许您检查插件是否符合 VST 3 标准。



**常见VST3宿主软件列表**

| Name | Company | Link |
| :---------------- | :------------------------------ | :----------------------------------------------------------- |
| Live | Ableton AG | [https://www.ableton.com/en/live](https://www.ableton.com/en/live/) |
| Audition | Adobe | [https://www.adobe.com](https://www.adobe.com/products/audition.html) |
| Sonar | Bandlab/Cakewalk | <https://www.bandlab.com/products/cakewalk> |
| Bitwig | Bitwig GmbH | [https://www.bitwig.com](https://www.bitwig.com/) |
| Max | Cycling 74 | [https://cycling74.com](https://cycling74.com/) |
| FL Studio | ImageLine | [https://www.image-line.com](https://www.image-line.com/) |
| Samplitude | MAGIX Software GmbH | [https://www.magix.com](https://www.magix.com/gb/music/samplitude/) |
| Digital Performer | MOTU | [https://motu.com/en-us/products/software/dp](https://motu.com/en-us/products/software/dp/) |
| Bidule | Plogue Art et Technologie, Inc. | [https://www.plogue.com](https://www.plogue.com/) |
| Studio One | PreSonus Software Ltd | <https://www.presonus.com/products/Studio-One> |
| Reaper | Reaper | [https://www.reaper.fm](https://www.reaper.fm/) |
| Cubase | Steinberg Media Technologies | [https://new.steinberg.net/cubase](https://new.steinberg.net/cubase/) |
| Nuendo | Steinberg Media Technologies | [https://new.steinberg.net/nuendo](https://new.steinberg.net/nuendo/) |
| Wavelab | Steinberg Media Technologies | [https://new.steinberg.net/wavelab](https://new.steinberg.net/wavelab/) |
| Dorico | Steinberg Media Technologies | [https://new.steinberg.net/dorico](https://new.steinberg.net/dorico/) |
| Waveform | Tracktion Software Corporation | [https://www.tracktion.com](https://www.tracktion.com/) |
