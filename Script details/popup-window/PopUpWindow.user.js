// ==UserScript==
// @name        Small Window Preview
// @description Drag a link to open it in a popup window with a preview before opening, using Edge's prerendering technology. Also, add an acrylic effect behind the window when it's open.
// @name:en        Small Window Preview
// @description:en Drag a link to open it in a popup window with a preview before opening, using Edge's prerendering technology. Also, add an acrylic effect behind the window when it's open.
// @name:zh-CN    小窗预览
// @description:zh-CN 拖拽链接时在弹出窗口中打开链接，并在打开前提供预览，使用 Edge 的预读技术。同时在小窗口打开时在背后添加亚克力效果。
// @name:zh-TW    小窗預覽
// @description:zh-TW 拖曳連結時在彈出視窗中打開連結，並在打開前提供預覽，使用 Edge 的預讀技術。同時在小窗口打開時在背後添加壓克力效果。
// @name:ja        小窓プレビュー
// @description:ja リンクをドラッグしてポップアップウィンドウでプレビューを表示し、Edge のプレビュー技術を使用して開く前にリンクを開きます。また、ウィンドウが開いているときにアクリル効果を背景に追加します。
// @name:vi        Xem trước cửa sổ nhỏ
// @description:vi Kéo thả liên kết để mở nó trong một cửa sổ popup với chế độ xem trước trước khi mở, sử dụng công nghệ tiên đoán của Edge. Đồng thời, thêm hiệu ứng acrylic phía sau cửa sổ khi nó mở.
// @version 2.4.0.12
// @author       人民的勤务员 <toniaiwanowskiskr47@gmail.com>  & hiisme
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_info
// @namespace https://greasyfork.org/users/217852
// @supportURL              https://github.com/ChinaGodMan/UserScripts/issues
// @homepageURL   https://github.com/ChinaGodMan/UserScripts
// @icon          https://github.com/ChinaGodMan/UserScripts/raw/main/docs/icon/Scripts%20Icons/icons8-POPUPWINDOW-48.png
// ==/UserScript==
const translate = (function () {
    const userLang = (navigator.languages && navigator.languages[0]) || navigator.language || 'en'
    const strings = {
        'en': {
            actionMode: 'Select Trigger Mode',
            actionMode1: 'Long Press',
            actionMode2: 'Drag',
            actionMode0: 'Both',
            longPressDuration: 'Long Press Duration',
            blurEnabled: 'Toggle Blur Effect',
            blurIntensity: 'Set Blur Intensity',
            closeOnMouseClick: 'Toggle Close on Mouse Click',
            closeOnScroll: 'Toggle Close on Scroll',
            windowWidth: 'Set Window Width',
            windowHeight: 'Set Window Height',
            setLongPressDuration: 'Enter Long Press Duration (milliseconds):',
            setBlurIntensityprompt: 'Enter Blur Intensity (0-10):',
            toggleActionMode: 'Select Trigger Mode:\n1: Long Press\n2: Drag\n0: Both',
            setWindowSizeprompt: 'Enter Window Size (pixels):',
            showCountdown: 'Show countdown progress bar',
            saveWindowConfig: 'Record window position',
            showCountdowndrag: 'Show drag timeout progress bar',
            dragTimeOut: 'Drag timeout duration',
        },
        'zh-CN': {
            actionMode: '选择触发方式',
            actionMode1: '长按',
            actionMode2: '拖拽',
            actionMode0: '两者都用',
            longPressDuration: '长按触发时间',
            blurEnabled: '模糊效果',
            blurIntensity: '设置模糊强度',
            closeOnMouseClick: '点击关闭小窗',
            closeOnScroll: '滚动关闭小窗',
            windowWidth: '设置小窗宽度',
            windowHeight: '设置小窗高度',
            setLongPressDuration: '输入长按触发时间（毫秒）:',
            setBlurIntensityprompt: '输入模糊强度（0-10）:',
            toggleActionMode: '选择触发方式:\n1: 长按\n2: 拖拽\n0: 两者都用',
            setWindowSizeprompt: '输入小窗口（像素）:',
            showCountdown: '显示长按倒计时进度条',
            saveWindowConfig: '记录窗口位置',
            showCountdowndrag: '显示拖拽超时进度条',
            dragTimeOut: '拖拽超时时间',
        },
        'zh-TW': {
            actionMode: '選擇觸發方式',
            actionMode1: '長按',
            actionMode2: '拖曳',
            actionMode0: '兩者都用',
            longPressDuration: '長按觸發時間',
            blurEnabled: '切換模糊效果',
            blurIntensity: '設定模糊強度',
            closeOnMouseClick: '切換點擊關閉小窗',
            closeOnScroll: '切換滾動關閉小窗',
            windowWidth: '設定小窗寬度',
            windowHeight: '設定小窗高度',
            setLongPressDuration: '輸入長按觸發時間（毫秒）:',
            setBlurIntensityprompt: '輸入模糊強度（0-10）:',
            toggleActionMode: '選擇觸發方式:\n1: 長按\n2: 拖曳\n0: 兩者都用',
            setWindowSizeprompt: '輸入小窗口（像素）:',
            showCountdown: '顯示倒數計時進度條',
            saveWindowConfig: '記錄窗口位置',
            showCountdowndrag: '顯示拖曳逾時進度條',
            dragTimeOut: '拖曳逾時時間',
        },
        'ja': {
            actionMode: 'トリガーモードの選択',
            actionMode1: '長押し',
            actionMode2: 'ドラッグ',
            actionMode0: '両方',
            longPressDuration: '長押しの時間',
            blurEnabled: 'ぼかし効果の切り替え',
            blurIntensity: 'ぼかしの強度を設定',
            closeOnMouseClick: 'マウスクリックで閉じる切り替え',
            closeOnScroll: 'スクロールで閉じる切り替え',
            windowWidth: 'ウィンドウ幅の設定',
            windowHeight: 'ウィンドウ高さの設定',
            setLongPressDuration: '長押しの時間（ミリ秒）を入力:',
            setBlurIntensityprompt: 'ぼかしの強度（0-10）を入力:',
            toggleActionMode: 'トリガーモードの選択:\n1: 長押し\n2: ドラッグ\n0: 両方',
            setWindowSizeprompt: 'ウィンドウサイズ（ピクセル）を入力:',
            showCountdown: 'カウントダウン進行状況を表示',
            saveWindowConfig: 'ウィンドウの位置を記録',
            showCountdowndrag: 'ドラッグタイムアウトの進行状況バーを表示',
            dragTimeOut: 'ドラッグタイムアウト時間',
        },
        'vi': {
            actionMode: 'Chọn chế độ kích hoạt',
            actionMode1: 'Nhấn lâu',
            actionMode2: 'Kéo thả',
            actionMode0: 'Cả hai',
            longPressDuration: 'Thời gian nhấn lâu',
            blurEnabled: 'Bật hiệu ứng mờ',
            blurIntensity: 'Cài đặt độ mờ',
            closeOnMouseClick: 'Bật/tắt đóng cửa sổ bằng nhấp chuột',
            closeOnScroll: 'Bật/tắt đóng cửa sổ khi cuộn',
            windowWidth: 'Cài đặt chiều rộng cửa sổ',
            windowHeight: 'Cài đặt chiều cao cửa sổ',
            setLongPressDuration: 'Nhập thời gian nhấn lâu (mili giây):',
            setBlurIntensityprompt: 'Nhập độ mờ (0-10):',
            toggleActionMode: 'Chọn chế độ kích hoạt:\n1: Nhấn lâu\n2: Kéo thả\n0: Cả hai',
            setWindowSizeprompt: 'Nhập kích thước cửa sổ (pixel):',
            showCountdown: 'Hiển thị thanh tiến trình đếm ngược',
            saveWindowConfig: 'Ghi lại vị trí cửa sổ',
            showCountdowndrag: 'Hiển thị thanh tiến trình quá hạn khi kéo thả',
            dragTimeOut: 'Thời gian quá hạn khi kéo thả',
        }
    }
    // 返回翻译函数
    return (id, lang = '') => {
        const selectedLang = lang || userLang
        return (strings[selectedLang] || strings.en)[id] || strings.en[id]
    }
}());
(function () {
    'use strict'
    const state = {
        isDragging: false,
        linkToPreload: null,
        popupWindow: null,
        acrylicOverlay: null,
        progressBar: null,
        dragprogressBar: null,
        dragintervalId: null,
        startTime: null,
    }
    const config = {
        windowWidth: GM_getValue('windowWidth', 870),
        windowHeight: GM_getValue('windowHeight', 530),
        screenLeft: (GM_getValue('screenLeft', 0) === 0)
            ? (window.screen.width - GM_getValue('windowWidth', 870)) / 2
            : GM_getValue('screenLeft'),
        screenTop: (GM_getValue('screenTop', 0) === 0)
            ? (window.screen.height - GM_getValue('windowHeight', 530)) / 3
            : GM_getValue('screenTop'),
        blurIntensity: GM_getValue('blurIntensity', 5),
        blurEnabled: GM_getValue('blurEnabled', true),
        closeOnMouseClick: GM_getValue('closeOnMouseClick', true),
        closeOnScroll: GM_getValue('closeOnScroll', true),
        longPressDuration: GM_getValue('longPressDuration', 500), // 长按持续时间（毫秒）
        dragTimeOut: GM_getValue('dragTimeOut', 2000), // 拖拽超时时间（毫秒）
        actionMode: GM_getValue('actionMode', 0), // 0: 两者都用, 1: 长按, 2: 拖拽
        showCountdown: GM_getValue('showCountdown', true), // 是否显示倒计时进度条
        showCountdowndrag: GM_getValue('showCountdowndrag', true), // 是否显示拖拽倒计时进度条
        saveWindowConfig: GM_getValue('saveWindowConfig', false)//记住窗口位置,没啥用
    }
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    async function preloadLink(link, attributes = {}) {
        const preloadElement = document.createElement('link')
        preloadElement.rel = 'preload'
        preloadElement.href = link
        preloadElement.as = '*/*'
        Object.assign(preloadElement, attributes)
        document.head.appendChild(preloadElement)
        await delay(1)
    }
    function createAcrylicOverlay() {
        const acrylicOverlay = document.createElement('div')
        acrylicOverlay.style.position = 'fixed'
        acrylicOverlay.style.top = '0'
        acrylicOverlay.style.left = '0'
        acrylicOverlay.style.width = '100%'
        acrylicOverlay.style.height = '100%'
        acrylicOverlay.style.zIndex = '9999'
        acrylicOverlay.style.backdropFilter = config.blurEnabled ? `blur(${config.blurIntensity}px)` : 'none'
        if (config.closeOnMouseClick) {
            acrylicOverlay.addEventListener('click', handleAcrylicOverlayClick)
        }
        document.body.appendChild(acrylicOverlay)
        return acrylicOverlay
    }
    function handleAcrylicOverlayClick(event) {
        if (event.target === state.acrylicOverlay) {
            closePopupWindow()
        }
    }
    function removeAcrylicOverlay() {
        if (state.acrylicOverlay) {
            document.body.removeChild(state.acrylicOverlay)
            state.acrylicOverlay = null
        }
    }
    function openPopupWindow(link) {
        if (!state.popupWindow || state.popupWindow.closed) {
            state.acrylicOverlay = createAcrylicOverlay()
            state.popupWindow = window.open(link, '_blank', `width=${config.windowWidth},height=${config.windowHeight},left=${config.screenLeft},top=${config.screenTop}`)
            //   console.log('Popup window:', state.popupWindow) 
            state.popupWindowChecker = setInterval(() => {
                if (state.popupWindow) {//保证窗口存在时才检测,兼容下原来脚本点击原窗口焦点关闭覆盖层
                    if (state.popupWindow.closed) {
                        removeAcrylicOverlay()
                        clearInterval(state.popupWindowChecker)
                    } else {
                        const width = state.popupWindow.innerWidth
                        const height = state.popupWindow.innerHeight
                        const left = state.popupWindow.screenX
                        const top = state.popupWindow.screenY
                        /* console.log(`Popup window size: width=${width}, height=${height}`)
                        console.log(`Popup window position: left=${left}, top=${top}`) */
                        if (config.saveWindowConfig) {
                            saveWindowConfig(width, height, left, top)
                        }
                    }
                }
            }, 200)
        }
    }
    function closePopupWindow() {
        if (state.popupWindow && !state.popupWindow.closed) {
            state.popupWindow.close()
            state.popupWindow = null
            removeAcrylicOverlay()
            if (state.linkToPreload) {
                removePreloadedLink(state.linkToPreload)
            }
            window.removeEventListener('scroll', closePopupOnScroll)
        }
    }
    function removePreloadedLink(link) {
        const preloadElement = document.querySelector(`link[href="${link}"]`)
        if (preloadElement) {
            document.head.removeChild(preloadElement)
        }
    }
    function closePopupOnScroll() {
        if (state.popupWindow && !state.popupWindow.closed) {
            closePopupWindow()
        }
    }
    function toggleActionMode() {
        const mode = prompt(translate('toggleActionMode'), config.actionMode)
        if (mode !== null) {
            config.actionMode = parseInt(mode, 10)
            GM_setValue('actionMode', config.actionMode)
            setupEventListeners()
            updateMenuCommands()
        }
    }
    function setLongPressDuration() {
        const duration = prompt(translate('setLongPressDuration'), config.longPressDuration)
        if (duration !== null) {
            config.longPressDuration = duration
            GM_setValue('longPressDuration', duration)
            updateMenuCommands()
        }
    }
    function setdragTimeOut() {
        const duration = prompt(translate('dragTimeOut'), config.dragTimeOut)
        if (duration !== null) {
            config.dragTimeOut = duration
            GM_setValue('dragTimeOut', duration)
            updateMenuCommands()
        }
    }
    function toggleBlurEffect() {
        config.blurEnabled = !config.blurEnabled
        GM_setValue('blurEnabled', config.blurEnabled)
        updateMenuCommands()
    }
    function setBlurIntensity() {
        const intensity = prompt(translate('setBlurIntensityprompt'), config.blurIntensity)
        if (intensity !== null) {
            config.blurIntensity = parseInt(intensity, 10)
            GM_setValue('blurIntensity', config.blurIntensity)
            updateMenuCommands()
        }
    }
    function toggleCloseOnMouseClick() {
        config.closeOnMouseClick = !config.closeOnMouseClick
        GM_setValue('closeOnMouseClick', config.closeOnMouseClick)
        updateMenuCommands()
    }
    function toggleCloseOnScroll() {
        config.closeOnScroll = !config.closeOnScroll
        handleScrollCommand()
        GM_setValue('closeOnScroll', config.closeOnScroll)
        updateMenuCommands()
    }
    function handleScrollCommand() {
        if (config.closeOnScroll) {
            window.addEventListener('scroll', closePopupOnScroll, { once: true })
        } else {
            window.removeEventListener('scroll', closePopupOnScroll)
        }
    }
    function setWindowSize(dimension) {
        const size = prompt(`${translate('setWindowSizeprompt')} (${dimension})`, config[dimension === 'width' ? 'windowWidth' : 'windowHeight'])
        if (size !== null) {
            config[dimension === 'width' ? 'windowWidth' : 'windowHeight'] = parseInt(size, 10)
            GM_setValue(dimension === 'width' ? 'windowWidth' : 'windowHeight', config[dimension === 'width' ? 'windowWidth' : 'windowHeight'])
            updateMenuCommands()
            if (state.popupWindow && !state.popupWindow.closed) {
                state.popupWindow.resizeTo(config.windowWidth, config.windowHeight)
            }
        }
    }
    let registeredMenuCommands = {}
    function registerMenuCommand(label, action) {
        const menuCommandId = GM_registerMenuCommand(label, action)
        registeredMenuCommands[label] = menuCommandId
        return menuCommandId
    }
    function toggleshowCountdown() {
        config.showCountdown = !config.showCountdown
        GM_setValue('showCountdown', config.showCountdown)
        updateMenuCommands()
    }
    function saveWindowConfig(width, height, left, top) {
        config.windowHeight = height
        config.windowWidth = width
        config.screenLeft = left
        config.screenTop = top
        GM_setValue('windowWidth', width)
        GM_setValue('windowHeight', height)
        GM_setValue('screenLeft', left)
        GM_setValue('screenTop', top)
        updateMenuCommands()
    }
    function toggleSwitch(property) {
        if (property in config) {
            config[property] = !config[property]
            GM_setValue(property, config[property])
            updateMenuCommands()
        }
    }
    function updateMenuCommands() {
        const menuCommands = [
            { label: translate('actionMode') + ` (${config.actionMode === 1 ? translate('actionMode1') : config.actionMode === 2 ? translate('actionMode2') : translate('actionMode0')})`, action: toggleActionMode },
            { label: translate('longPressDuration') + ` (${config.longPressDuration}ms)`, action: setLongPressDuration },
            { label: translate('dragTimeOut') + ` (${config.dragTimeOut}ms)`, action: setdragTimeOut },
            { label: translate('blurEnabled') + ` (${config.blurEnabled ? '✅' : '❌'})`, action: toggleBlurEffect },
            { label: translate('blurIntensity') + ` (${config.blurIntensity})`, action: setBlurIntensity },
            { label: translate('closeOnMouseClick') + ` (${config.closeOnMouseClick ? '✅' : '❌'})`, action: toggleCloseOnMouseClick },
            { label: translate('closeOnScroll') + ` (${config.closeOnScroll ? '✅' : '❌'})`, action: toggleCloseOnScroll },
            { label: translate('windowWidth') + ` (${config.windowWidth})`, action: () => { setWindowSize('width') } },
            { label: translate('windowHeight') + ` (${config.windowHeight})`, action: () => { setWindowSize('height') } },
            { label: translate('showCountdown') + ` (${config.showCountdown ? '✅' : '❌'})`, action: () => { toggleSwitch('showCountdown') } },
            { label: translate('showCountdowndrag') + ` (${config.showCountdowndrag ? '✅' : '❌'})`, action: () => { toggleSwitch('showCountdowndrag') } },
            { label: translate('saveWindowConfig') + ` (${config.saveWindowConfig ? '✅' : '❌'})`, action: () => { toggleSwitch('saveWindowConfig') } },
        ]
        for (const label in registeredMenuCommands) {
            GM_unregisterMenuCommand(registeredMenuCommands[label])
        }
        registeredMenuCommands = {}
        menuCommands.forEach((command) => {
            registerMenuCommand(command.label, command.action)
        })
    }
    updateMenuCommands()
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
    }
    function setupEventListeners() {
        // 移除旧的事件监听器
        document.body.removeEventListener('dragstart', handleDragStart)
        document.body.removeEventListener('dragend', handleDragEnd)
        document.body.removeEventListener('mousedown', handleMouseDown)
        document.body.removeEventListener('mouseup', handleMouseUp)
        document.body.removeEventListener('mouseleave', handleMouseLeave)
        document.body.removeEventListener('wheel', handleWheel)
        document.body.removeEventListener('click', handleClick)
        // 根据 actionMode 配置添加事件监听器
        if (config.actionMode === 1 || config.actionMode === 0) {
            document.body.addEventListener('mousedown', handleMouseDown)
            document.body.addEventListener('mouseup', handleMouseUp)
            document.body.addEventListener('mouseleave', handleMouseLeave)
        }
        if (config.actionMode === 2 || config.actionMode === 0) {
            document.body.addEventListener('dragstart', handleDragStart)
            document.body.addEventListener('dragend', handleDragEnd)
        }
        document.body.addEventListener('wheel', handleWheel)
        document.body.addEventListener('click', handleClick)
    }
    // 事件处理函数
    function handleDragStart(event) {
        const linkElement = event.target.tagName === 'A' ? event.target : event.target.closest('a')
        if (linkElement) {
            if (config.showCountdowndrag && config.dragTimeOut != 0) {//超时选项,只要
                state.dragprogressBar = createProgressBar('#ff9800', '#f44336')
                state.dragprogressBar.style.display = 'block'
                state.dragprogressBar.style.width = '5%'
                state.startTime = Date.now()
                clearInterval(state.dragintervalId)
                state.dragintervalId = setInterval(function () {
                    const elapsed = Date.now() - state.startTime
                    const progress = Math.max(5 - (elapsed / config.dragTimeOut) * 5, 0) // 减小你妈
                    state.dragprogressBar.style.width = `${progress}%`
                    if (progress <= 0) {// 超时结束
                        state.isDragging = false
                        clearInterval(state.dragintervalId)
                        state.dragprogressBar.style.display = 'none'
                    }
                }, 100) //
                window.addEventListener('drag', function (event) {
                    // 保证进度条位置处于貂毛鼠标的下面
                    const x = event.clientX
                    const y = event.clientY + 30 // 偏移
                    state.dragprogressBar.style.left = `${x}px`
                    state.dragprogressBar.style.top = `${y}px`
                })
            }
            const link = linkElement.href
            state.isDragging = true
            state.linkToPreload = link
            preloadLink(state.linkToPreload, { importance: 'high' }).then(() => {
                if (config.closeOnScroll) {
                    window.addEventListener('scroll', closePopupOnScroll, { once: true })
                }
            })
        }
    }
    function handleDragEnd() {
        if (state.dragprogressBar) {//显示超时进度条时
            clearInterval(state.dragintervalId)
            state.dragprogressBar.style.display = 'none'
        }
        if (state.isDragging && state.linkToPreload) {
            state.isDragging = false
            openPopupWindow(state.linkToPreload)
            state.linkToPreload = null
        }
    }
    function createProgressBar(colorStart = '#4caf50', colorEnd = '#81c784') {
        if (!config.showCountdown && !config.showCountdowndrag) return null
        const progressBar = document.createElement('div')
        Object.assign(progressBar.style, {
            position: 'fixed',
            height: '6px',
            width: '5%',
            background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
            borderRadius: '3px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
            zIndex: '9999',
        })
        document.body.appendChild(progressBar)
        return progressBar
    }
    let mouseDownTime = 0
    function handleMouseDown(event) {
        const linkElement = event.target.tagName === 'A' ? event.target : event.target.closest('a')
        if (linkElement) {
            let isDragging = false
            let isMouseDown = true
            const onMouseMove = () => {
                isDragging = true
                clearTimeout(state.pressTimer)
                progressBarremove()
            }
            const onMouseUp = () => {
                isMouseDown = false
                clearTimeout(state.pressTimer)
                progressBarremove()
            }
            document.addEventListener('dragstart', onMouseMove, { once: true })
            document.addEventListener('mouseup', onMouseUp, { once: true })
            setTimeout(() => { // 按下100ms后显示倒计时，避免点击就显示
                if (!isDragging && isMouseDown) { // 确保没有拖拽并且鼠标仍按下
                    state.progressBar = createProgressBar()
                    if (state.progressBar) {
                        const transitionDuration = Math.max(config.longPressDuration - 100, 0) + 'ms'
                        state.progressBar.style.left = `${event.clientX}px`  // 设置进度条位置为鼠标下方
                        state.progressBar.style.top = `${event.clientY + 20}px`  // 偏移一点，避免挡住鼠标
                        state.progressBar.style.transition = `width ${transitionDuration} linear`
                        requestAnimationFrame(() => {
                            state.progressBar.style.width = '0'
                        })
                    }
                }
            }, 100)
            state.pressTimer = setTimeout(() => {
                if (!isDragging && isMouseDown) { // 确保没有拖拽并且鼠标仍按下
                    const link = linkElement.href
                    state.linkToPreload = link
                    preloadLink(state.linkToPreload, { importance: 'high' }).then(() => {
                        openPopupWindow(state.linkToPreload)
                    })
                }
                progressBarremove()
            }, config.longPressDuration)
        }
    }
    function handleMouseUp() {
        clearTimeout(state.pressTimer)
        state.pressTimer = null
        progressBarremove()
    }
    function progressBarremove() {
        if (state.progressBar) {
            state.progressBar.remove()
        }
    }
    function handleMouseLeave() {
        clearTimeout(state.pressTimer)
        state.pressTimer = null
    }
    function handleWheel() {
        if (config.closeOnScroll) {
            closePopupWindow()
        }
    }
    function handleClick(event) {
        if (event.target === state.acrylicOverlay) {
            removeAcrylicOverlay()
        }
    }
    setupEventListeners()
})()