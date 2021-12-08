[TOC]



# VST3的主要优点

Here, you can find a non-exhaustive list of **VST 3** benefits.

VST3 is a general rework of the long-serving **VST** plug-in interface (VST 1 & VST 2) . It is not compatible with the older VST (1 & 2) versions, but it includes some new features and possibilities. We have redesigned the API to make it not only far easier and more reliable for developers to work with, but have also provided completely new possibilities for plug-ins. These include:

1. **使用Slience Flag改进表演**

   Managing large plug-in sets and multiple virtual instruments on typical studio computer systems can often be difficult because of CPU performance limits. **VST 3** helps to improve overall performance by applying processing to plug-ins only when audio signals are present on their respective inputs. Instead of always processing input signals, **VST 3** plug-ins can apply their processing economically and only when it is needed.

2. **多路动态 I/Os**

   **VST 3** plug-ins are no longer limited to a fixed number of inputs and outputs, and their I/O configuration can dynamically adapt to the channel configuration. [Side-chains](https://developer.steinberg.help/display/VST/Frequently+Asked+Questions#FrequentlyAskedQuestions-WhatisaSide-chain) are also very easily realizable. This includes the possibility to deactivate unused buses after loading and even reactivate those when needed. This cleans up the mixer and further helps to reduce CPU load.

3. **自动的采样精确化**

   **VST 3** also features vastly improved parameter automation with sample accuracy and support for ramped automation data, allowing completely accurate and rapid parameter automation changes.

4. **逻辑参数组织**

   The **VST 3** plug-in parameters are displayed in a tree structure. Parameters are grouped into sections which represent the structure of the plug-in. Plug-ins can communicate their internal structure for the purpose of overview, but also for some associated functionality (eg. program-lists). Parameters like “*Cutoff*” and “*Resonance*” could be grouped into a section called “*Filter*”. This makes searching for a certain parameters easier, such as on an automation track. This also allows assigning a group of parameters to a specific *MIDI* Channel input and audio output bus.

5. **可改变大小的界面编辑器**

   **VST 3** introduces a new approach to plug-in GUIs though window resizing, allowing for extremely flexible use of valuable screen space.

6. **对鼠标的支持**

   The Host could ask the plug-in which parameter is under the mouse.

7. **菜单上下文支持**

   **VST 3** defines a way to allow the host to add its own entries in the plug-in context menu of a specific parameter.

8. **通道菜单支持**

   A **VST 3** plug-in can access channel information where it is instantiated: name, color,...

9. **音符表达式**

   **VST 3** defines with [Note Expression](https://developer.steinberg.help/display/VST/[3.5.0]+Note+Expression+Support) a new way of event controller editing. The plug-in is able to break free from the limitations of MIDI controller events by providing access to new **VST 3** controller events that circumvent the laws of MIDI and provide articulation information for each individual note (event) in a polyphonic arrangement according to its noteId.

10. **3D音频支持**

    **VST 3** supports new speaker configurations like Ambisonic, Atmos, Auro 3D or 22.2.

11. **工厂概念**

    **VST 3** plug-in library could export multiple plug-ins and in this way replaces the shell concept of **VST 2** (kPlugCategShell).

12. **远程控制表现**

    Remote controllers for audio and MIDI software applications have become increasingly popular. **VST 3** offers far more flexible control of VST plug-ins by remote controllers. Using the knobs and faders on the control surface, parameters can be recorded, renamed and edited in many ways. Parameters that cannot be edited can be routed for display purposes to the control surface, for example, to show Gain Reduction on a compressor.

13. **其他**

    While designing **VST 3**, we performed a careful analysis of the existing functionality of **VST** and rewrote the interfaces from scratch. In doing so, we focused a lot on providing clear interfaces and their documentation in order to avoid usage errors from the deepest possible layer. Some more features implemented specifically for developers include:

    - More stable technical host/plug-in environment
    - Advanced technical definition of the standard
    - Modular approach
    - Separation of UI and processing
    - UTF16 for localized parameter naming
    - Advanced preset system
    - Multiple plug-ins per library
    - **VST 3 SDK** package:
      - [Test Host](https://developer.steinberg.help/display/VST/VST+3+Plug-in+Test+Host) included
      - Automated testing environment
      - Validator (small command line Test Host)
      - [Plug-in and host examples](https://developer.steinberg.help/display/VST/VST+3+Plug-ins+Examples) code included
      - [Project Generator](https://developer.steinberg.help/display/VST/VST+3+Project+Generator)
      - ...

