[TOC]



# 开始



## 获取VST3 SDK

| Component                                                    | [as zip package](https://developer.steinberg.help/display/VST/VST+3+Links#VST3Links-aszip) | [as GitHub repository](https://developer.steinberg.help/display/VST/VST+3+Links#VST3Links-repository) |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| [VSTGUI](https://developer.steinberg.help/display/VST/VSTGUI) | ![(滴答)](IMAGE/check.svg)                                   | ![(滴答)](IMAGE/check.svg) |
| [VST 3 Project Generator](https://developer.steinberg.help/display/VST/VST+3+Project+Generator) (exe only) | ![(滴答)](IMAGE/check.svg) | ![(出错)](IMAGE/error.svg) |
| [VST 3 Plug-ins Examples](https://developer.steinberg.help/display/VST/VST+3+Plug-ins+Examples) | ![(滴答)](IMAGE/check.svg) | ![(滴答)](IMAGE/check.svg) |
| [VST 3 Plug-in Test Host](https://developer.steinberg.help/display/VST/VST+3+Plug-in+Test+Host) (exe only) | ![(滴答)](IMAGE/check.svg) | ![(出错)](IMAGE/error.svg) |
| [VST 3 Licensing](https://developer.steinberg.help/display/VST/VST+3+Licensing) | ![(滴答)](IMAGE/check.svg)Proprietary+ [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html) | ![(出错)](IMAGE/error.svg)only [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html) |
| [VST 3 API](https://developer.steinberg.help/display/VST/VST+3+API+Documentation) | ![(滴答)](IMAGE/check.svg) | ![(滴答)](IMAGE/check.svg) |
| [VST3 Inspector](https://developer.steinberg.help/pages/viewpage.action?pageId=9797960#WhatistheVST3SDK?-VST3Inspector) | ![(滴答)](IMAGE/check.svg) | ![(滴答)](IMAGE/check.svg) |
| [Validator command line](https://developer.steinberg.help/pages/viewpage.action?pageId=9797960#WhatistheVST3SDK?-validator) | ![(滴答)](IMAGE/check.svg) | ![(滴答)](IMAGE/check.svg) |
| [iOS Inter-App Audio support](https://developer.steinberg.help/display/VST/iOS+Inter-App+Audio+support) | ![(滴答)](IMAGE/check.svg) | ![(滴答)](IMAGE/check.svg) |
| [Helpers classes](https://developer.steinberg.help/pages/viewpage.action?pageId=9797960#WhatistheVST3SDK?-Helpersclasses) | ![(滴答)](IMAGE/check.svg) | ![(滴答)](IMAGE/check.svg) |
| [EditorHost](https://developer.steinberg.help/pages/viewpage.action?pageId=9797960#WhatistheVST3SDK?-EditorHost) | ![(滴答)](IMAGE/check.svg) | ![(滴答)](IMAGE/check.svg) |
| [AudioAudioHost](https://developer.steinberg.help/pages/viewpage.action?pageId=9797960#WhatistheVST3SDK?-AudioHost) | ![(滴答)](IMAGE/check.svg) | ![(滴答)](IMAGE/check.svg) |
| [AAX, AUv3, AU and VST 2 wrappers](https://developer.steinberg.help/display/VST/AAX%2C+AUv3%2C+AU+and+VST+2+wrappers) | ![(滴答)](IMAGE/check.svg) | ![(滴答)](IMAGE/check.svg) |



**Download the full VST 3 package as zip file**

Download a full **VST 3 SDK** package which includes everything you need to build a **VST 3** plug-in or host. Test your **VST 3** plug-in in real-time with the included [VST 3 Plug-in Test Host](https://developer.steinberg.help/display/VST/VST+3+Plug-in+Test+Host) and execute automated tests (See [What is the VST 3 SDK?](https://developer.steinberg.help/pages/viewpage.action?pageId=9797960)):

<https://www.steinberg.net/vst3sdk> (direct link to zip file, 101 MB)



**Clone VST 3 repository from GitHub**

Clone the **VST 3 SDK** repository from **GitHub** for easy integration into your workspace:



> Independently of the download source of the **VST 3 SDK** be sure that you follow the license agreement (check [What are the licensing options for VST 3?](https://developer.steinberg.help/pages/viewpage.action?pageId=9797944))



## Online Documentation

Browse the **VST 3 SDK**'s online documentation including **API** reference and sample code:



Browse the VST portal for the whole documentation and tutorials:





## VST 3 Forum

Visit Steinberg's **VST Developer Forum** in order to get help with development, submit bug reports, request new features and connect to other **VST 3** developers:https://sdk.steinberg.net



## VSTGUI

When you download the **VST 3 SDK**, the last official release version of [**VSTGUI** ](https://developer.steinberg.help/display/VST/VSTGUI)is included, but you can get it (the release and the development branches) from github:<https://github.com/steinbergmedia/vstgui>



## Get the source code

**From the downloaded *vstsdk.zip* file**

Download the **VST 3 SDK**: check [VST 3 SDK Download](https://developer.steinberg.help/display/VST/VST+3+Links#VST3Links-VST3SDKDownload).

Unpack the zip file to a development folder on your computer.

**From GitHub:**

```
`git clone ``--recursive https://github.com/steinbergmedia/vst3sdk.git`
```



## Get a IDE for development

**For Windows**

On **Windows**, we recommend that you to use **Visual Studio C++** or **Visual Studio Code.** You can get it for free here [https://**visualstudio**.microsoft.com/free](https://visualstudio.microsoft.com/free-developer-offers/).

**For MacOS**

On MacOS, a first choice is **Xcode** (available here <https://developer.apple.com/xcode/>).

**For Linux**

In order to build the SDK successfully, you need an Ubuntu-based **Linux** distribution. Other distributions might work as well, but are not tested.

1. Download Linux: [http://www.ubuntu.com](http://www.ubuntu.com/) or [https://www.linuxmint.com](https://www.linuxmint.com/)
2. Install it directly or in a virtual machine like Parallels
   We used and tested on Ubuntu 20.04 LTS.



## Package Requirements

Building the SDK examples requires installation of several packages:

Required:

```shell
`sudo apt-get install cmake gcc ``"libstdc++6"` `libx11-xcb-dev libxcb-util-dev libxcb-cursor-dev libxcb-xkb-dev libxkbcommon-dev libxkbcommon-x11-dev libfontconfig1-dev libcairo2-dev libgtkmm-``3.0-``dev libsqlite3-dev libxcb-keysyms1-dev`
```

> On Raspbian/Debian, replace "libxcb-util-dev" with "libxcb-util0-dev"

Optional:

```
`sudo apt-get install subversion git ninja-build`
```

A recommended IDE (optional): **QTCreator**

```
`sudo apt-get install qtcreator`
```

> You can also use the bash file "***setup_linux_packages_for_vst3sdk.sh***" included in the VST3_SDK/tools folder!

- [Instead of ](https://www.gtkmm.org/)[**gcc** ](https://gcc.gnu.org/install/)compiler, a recent version of [**clang** ](https://clang.llvm.org/)[compiler will also work!](https://www.gtkmm.org/)
- [libgtkmm3](https://www.gtkmm.org/) is required for [VSTGUI ](https://developer.steinberg.help/display/VST/How+to+set+up+my+system+for+VST+3#HowtosetupmysystemforVST3-VSTGUI)and the [editorhost ](https://developer.steinberg.help/display/VST/How+to+set+up+my+system+for+VST+3#HowtosetupmysystemforVST3-editorhost)example!
- [Jack Audio](http://www.jackaudio.org/) ([http://www.jackaudio.org](http://www.jackaudio.org/)) is required for [audiohost ](https://developer.steinberg.help/display/VST/How+to+set+up+my+system+for+VST+3#HowtosetupmysystemforVST3-audiohost)example!



## Get cmake

In order to control the compilation process and create an IDE project, **VST 3 SDK** uses the open-source and cross-platform tool [cmake.](https://cmake.org/)

You can download cmake here: <https://cmake.org/download/> or use a package manager for your OS (Linux).

You can use it as a command line tool or use the cmake executable with GUI. cmake-gui is included in the cmake package:

![img](IMAGE/cmakeGui.jpg)



## Preparation on Windows

Generated VST3 Microsoft Visual Studio Projects using the [cmake](https://cmake.org/) included in the SDK will create by default symbolic links for each built plug-in in the [official VST3 folder](https://developer.steinberg.help/display/VST/Plug-in+Locations), in order to allow this on Windows you have to adapt the Group Policy of Windows. See [Here](https://developer.steinberg.help/display/VST/Preparation+on+Windows)!

If you do not want to create this link, call [cmake](https://cmake.org/) with this parameter:

```
`-SMTG_CREATE_PLUGIN_LINK=``0`
```

**Note for Windows**: In order to be able to create a symbolic link, you have to set the correct group policy. Proceed as follows:

- Enter ***Edit group policy*** in the Windows search field:

![StartLocalGroupPolicyEditor](IMAGE\StartLocalGroupPolicyEditor.jpg)

- Navigate to:

  Computer Configuration => Windows Settings => Security Settings =>Local Policies => User Rights Assignment => Create symbolic links

  ![LocalGroupPolicyEditor](IMAGE\LocalGroupPolicyEditor.jpg)

Here you can set which users can create symbolic links.



## Get a VST 3 host application

You can use your favorite **VST 3** host application, see [here ](https://developer.steinberg.help/display/VST/Use+cases#Usecases-VST3Hosts)for some examples, or you can use the [VST 3 Plug-in Test Host](https://developer.steinberg.help/display/VST/VST+3+Plug-in+Test+Host) application included in the **VST 3 SDK**.