[TOC]

下面的开发文档涉及到全部你在开发VST3插件过程中的方方面面。



# 什么是VST



**VST3：虚拟工作室技术的一种新标准**

1996年，[Steinberg](https://www.steinberg.net/)在插件化与虚拟乐器技术领域建立了世界领先的、支持最广的标准：VST。之后Steinberg在不断优化升级过程中发布了新一代的虚拟工作室技术：VST3。VST3相较与VST是一个更加稳定、特性更丰富、更可靠的平台。这是世界领先技术团队Steinberg用20多年沉淀下来的成果。VST3为音乐行业的许多极具创造性、令人振奋的产品开发过程提供了相当有力的技术支持。VST3 SDK是一个免费的技术，对所有开发者开放。



**关于VST标准**

VST是数字音频领域的一场革命，由Steinberg研发并在1996年首次推出，VST为你的电脑创造了一个全面的、专业的工作室环境，你可以把各种虚拟效果器和虚拟乐器整合进来。你可以在VST系统中用软件的形式实现硬件效果器的各种有趣的效果。而且它可以和像数字音频工作站（DAW）之类的宿主软件无缝衔接，也可以轻易地和你的各类外部设备进行整合，提供一个为你自己量身定制的环境。作为一个开源标准，VST有着无限的可能性。Steinberg和其他公司仍在不断开发基于VST标准的效果器和虚拟乐器。



**从技术角度来看**

A **VST** plug-in is an audio processing component that is utilized within a host application. This host application provides the audio or/and event streams that are processed by the plug-in's code. Generally speaking, a **VST** plug-in can take a stream of audio data, apply a process to the audio, and return the result to the host application. A **VST** plug-in normally performs its process using the processor of the computer. The audio stream is broken into a series of blocks. The host supplies the blocks in sequence. The host and its current environment control the block-size. The **VST** plug-in maintains the status of all its own parameters relating to the running process: The host does not maintain any information about what the plug-in did with the last block of data it processed.

From the host application's point of view, a **VST** plug-in is a black box with an arbitrary number of inputs, outputs (Event (MIDI) or Audio), and associated parameters. The host needs no implicit knowledge of the plug-in's process to be able to use it. The plug-in process can use whatever parameters it wants, internally to the process, but depending on the capabilities of the host, it can allow the changes to user parameters to be automated by the host.

The source code of a **VST** plug-in is platform independent, but the delivery system depends on the platform architecture:

- On **Windows**, a **VST** plug-in is a multi-threaded DLL (Dynamic Link Library), recently packaged into a folder structure.
- On **Mac OS X**, a **VST** plug-in is a Mach-O Bundle
- On **Linux**, a **VST** plug-in is a package



## 用例

**为什么要使用VST3 SDK**

There are different use cases you can realize by using the **VST 3 SDK**:

1. You are a plug-in developer and you want to create audio FX or instrument plug-ins which can be included and used in a VST 3 host application.

   - an audio FX plug-in is an audio processor effect taking audio as input and creating audio as output: such as *Delay*, *Phaser*, *Compressor*, *Reverb,* *…*

   - an instrument plug-in is a sound/audio generator, taking as input note events and creating audio as output: such as emulations of well-known hardware synths. There are 2 kinds of instrument plug-ins: *virtual sample-based* (using audio samples as the basis for sound generation) and *virtual synth* (using different types of synthesis: physical modelling, additive, subtractive, FM, sample-based, …)

2. You are a ***host developer*** and you want to load in your application **VST 3** plug-ins：audio FX 、乐器插件



**VST3 SDK的优势**

By using **VST 3 SDK** directly:

- you are sure to be compliant with the **VST 3** format.
- developing your plug-in based on the **VST 3** format allows you to support easily new **VST 3** features that improve the integration of these plug-ins inside a DAW. Some 3rd party SDKs use only a common layer between all plug-in formats, limiting in this way the possibility for a better integration, for example exclusive **VST 3** features:
  - [context menu](https://developer.steinberg.help/display/VST/[3.5.0]+Context+Menu+Support)
  - [dirty state](https://developer.steinberg.help/display/VST/[3.1.0]+UI+Group+Editing%2C+Dirty+State+and+Open+Editor+Request+Support)
  - loading differentially a preset or a project
  - [note expression](https://developer.steinberg.help/display/VST/[3.5.0]+Note+Expression+Support)
  - see [others benefits of VST 3](https://developer.steinberg.help/display/VST/Main+benefits+of+VST+3)

- you get optimal integration of the [**VSTGUI** ](https://developer.steinberg.help/display/VST/Use+cases#Usecases-Vstgui)tool with **VST 3**
- it includes the major plug-in format wrappers:  AAX, AUv3, AU, VST2 (deprecated)
- the included [Validator ](https://developer.steinberg.help/display/VST/Use+cases#Usecases-validator)allows you to check your plug-in's conformity to the VST 3 standard



**常见VST3宿主软件列表**

| Name              | Company                         | Link                                                         |
| :---------------- | :------------------------------ | :----------------------------------------------------------- |
| Live              | Ableton AG                      | [https://www.ableton.com/en/live](https://www.ableton.com/en/live/) |
| Audition          | Adobe                           | [https://www.adobe.com](https://www.adobe.com/products/audition.html) |
| Sonar             | Bandlab/Cakewalk                | <https://www.bandlab.com/products/cakewalk>                  |
| Bitwig            | Bitwig GmbH                     | [https://www.bitwig.com](https://www.bitwig.com/)            |
| Max               | Cycling 74                      | [https://cycling74.com](https://cycling74.com/)              |
| FL Studio         | ImageLine                       | [https://www.image-line.com](https://www.image-line.com/)    |
| Samplitude        | MAGIX Software GmbH             | [https://www.magix.com](https://www.magix.com/gb/music/samplitude/) |
| Digital Performer | MOTU                            | [https://motu.com/en-us/products/software/dp](https://motu.com/en-us/products/software/dp/) |
| Bidule            | Plogue Art et Technologie, Inc. | [https://www.plogue.com](https://www.plogue.com/)            |
| Studio One        | PreSonus Software Ltd           | <https://www.presonus.com/products/Studio-One>               |
| Reaper            | Reaper                          | [https://www.reaper.fm](https://www.reaper.fm/)              |
| Cubase            | Steinberg Media Technologies    | [https://new.steinberg.net/cubase](https://new.steinberg.net/cubase/) |
| Nuendo            | Steinberg Media Technologies    | [https://new.steinberg.net/nuendo](https://new.steinberg.net/nuendo/) |
| Wavelab           | Steinberg Media Technologies    | [https://new.steinberg.net/wavelab](https://new.steinberg.net/wavelab/) |
| Dorico            | Steinberg Media Technologies    | [https://new.steinberg.net/dorico](https://new.steinberg.net/dorico/) |
| Waveform          | Tracktion Software Corporation  | [https://www.tracktion.com](https://www.tracktion.com/)      |
