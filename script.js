"use strict"

window.addEventListener('DOMContentLoaded', () => {
    // получение элементов со страницы
    const formDiagonal = document.querySelector('.form_diagonal'),
            inputAngleD = document.querySelector('.angle_d'),
            inputRadiusD = document.querySelector('.radius_d'),
            inputStepValueD = document.querySelector('.stepvalue_d'),
            inputInitialXD = document.querySelector('.initialx_d'),
            inputInitialYD = document.querySelector('.initialy_d'),
            inputSpeedValueD = document.querySelector('.speed_d'),
            inputPLaserD = document.querySelector('.PLaser_d'),
            inputDelayD = document.querySelector('.delay_d'),
            newProgramD = document.querySelector('.new_program_d')

    const formCircle = document.querySelector('.form_circle'),
            inputRadiusC = document.querySelector('.radius_c'),
            inputStepValueC = document.querySelector('.stepvalue_c'),
            inputInitialXC = document.querySelector('.initialx_c'),
            inputInitialYC = document.querySelector('.initialy_c'),
            inputSpeedValueC = document.querySelector('.speed_c'),
            inputPLaserC = document.querySelector('.PLaser_c'),
            inputDelayC = document.querySelector('.delay_c'),
            newProgramC = document.querySelector('.new_program_c')

    const formRows = document.querySelector('.form_rows'),
            inputRadiusR = document.querySelector('.radius_r'),
            inputStepValueR = document.querySelector('.stepvalue_r'),
            inputInitialXR = document.querySelector('.initialx_r'),
            inputInitialYR = document.querySelector('.initialy_r'),
            program = document.querySelector('.program')
    const formCols = document.querySelector('.form_cols')


    const showDiagonal = document.querySelector('.btn_show_diagonal'),
            showCircle = document.querySelector('.btn_show_circle'),
            showRows = document.querySelector('.btn_show_rows'),
            showCols = document.querySelector('.btn_show_cols'),
            onMainDiagonal = document.querySelector('.btn_on_main_d'),
            onMainCircle = document.querySelector('.btn_on_main_c'),
            onMainRows = document.querySelector('.btn_on_main_r'),
            onMainCols = document.querySelector('.btn_on_main_cols'),
            preview = document.querySelector('.preview'),
            diagonal = document.querySelector('.diagonal'),
            circle = document.querySelector('.circle'),
            rows = document.querySelector('.rows'),
            cols = document.querySelector('.cols')
    // логика перехода между страницами
    showDiagonal.addEventListener('click', () => {
        preview.classList.add('hide')
        diagonal.classList.remove('hide')
        diagonal.classList.add('show')
    })
    showCircle.addEventListener('click', () => {
        preview.classList.add('hide')
        circle.classList.remove('hide')
        circle.classList.add('show')
    })
    showRows.addEventListener('click', () => {
        preview.classList.add('hide')
        rows.classList.remove('hide')
        rows.classList.add('show')
    })
    showCols.addEventListener('click', () => {
        preview.classList.add('hide')
        cols.classList.remove('hide')
        cols.classList.add('show')
    })
    onMainDiagonal.addEventListener('click', () => {
        preview.classList.remove('hide')
        preview.classList.add('show')
        diagonal.classList.remove('show')
        diagonal.classList.add('hide')
    })
    onMainCircle.addEventListener('click', () => {
        preview.classList.remove('hide')
        preview.classList.add('show')
        circle.classList.remove('show')
        circle.classList.add('hide')
    })
    onMainRows.addEventListener('click', () => {
        preview.classList.remove('hide')
        preview.classList.add('show')
        rows.classList.remove('show')
        rows.classList.add('hide')
    })
    onMainCols.addEventListener('click', () => {
        preview.classList.remove('hide')
        preview.classList.add('show')
        cols.classList.remove('show')
        cols.classList.add('hide')
    })
    // главная функция расчета координат по радиусу
    const radiusCalc = (e) => {
        // отмена стандартного поведения браузера
        e.preventDefault()
        // очистка результатов
        newProgramD.innerHTML = ''
        // объявления переменных
        let angleAlpha = +inputAngleD.value,
            R = +inputRadiusD.value,
            stepvalue = +inputStepValueD.value,
            initialX = +inputInitialXD.value,
            initialPx = +inputInitialXD.value,
            initialMx = +inputInitialXD.value,
            initialY = +inputInitialYD.value,
            initialPy = +inputInitialYD.value,
            initialMy = +inputInitialYD.value,
            speed = +inputSpeedValueD.value,
            power = +inputPLaserD.value,
            delay = +inputDelayD.value,
            coordinates_PX_PY = [],
            coordinates_MX_PY = [],
            coordinates_MX_MY = [],
            coordinates_PX_MY = []
        // логика расчета
        let stepqqt = R / stepvalue
        let deltaX = Math.cos((Math.PI / 180) * angleAlpha) * stepvalue
        let deltaY = Math.sin((Math.PI / 180) * angleAlpha) * stepvalue
        let stepX = +deltaX.toFixed(2)
        let stepY = +deltaY.toFixed(2)
        for (let i = 1;  i <= stepqqt; i++) {
            initialPx+=stepX
            initialPy+=stepY
            initialMx-=stepX
            initialMy-=stepY
            coordinates_PX_PY.push(`X${+initialPx.toFixed(2)},Y${+initialPy.toFixed(2)}`)
            coordinates_MX_PY.push(`X${+initialMx.toFixed(2)},Y${+initialPy.toFixed(2)}`)
            coordinates_MX_MY.push(`X${+initialMx.toFixed(2)},Y${+initialMy.toFixed(2)}`)
            coordinates_PX_MY.push(`X${+initialPx.toFixed(2)},Y${+initialMy.toFixed(2)}`)
        }
        // преобразование массивов координат в основной цикл программы
        let PX_PY = coordinates_PX_PY.map((item) => {
            let listItem = ''
            return listItem = `
                <div>F${speed} G1  ${item.split(',')[0]} ${item.split(',')[1]}</div>
                <div>M3 S${power}</div>
                <div>G04 P${delay}.</div>
                <div>M5</div>
            `
        })

        let MX_PY = coordinates_MX_PY.map((item) => {
            let listItem = ''
            return listItem = `
                <div>F${speed} G1  ${item.split(',')[0]} ${item.split(',')[1]}</div>
                <div>M3 S${power}</div>
                <div>G04 P${delay}.</div>
                <div>M5</div>
            `
        })

        let MX_MY = coordinates_MX_MY.map((item) => {
            let listItem = ''
            return listItem = `
                <div>F${speed} G1  ${item.split(',')[0]} ${item.split(',')[1]}</div>
                <div>M3 S${power}</div>
                <div>G04 P${delay}.</div>
                <div>M5</div>
            `
        })

        let PX_MY = coordinates_PX_MY.map((item) => {
            let listItem = ''
            return listItem = `
                <div>F${speed} G1  ${item.split(',')[0]} ${item.split(',')[1]}</div>
                <div>M3 S${power}</div>
                <div>G04 P${delay}.</div>
                <div>M5</div>
            `
        })

        // отображение на странице результатов расчета
        const program = document.createElement('div')
        program.classList.add('program')
        program.innerHTML = `
            <div>M5</div>
            <div>F300 G1 X${initialX} Y${initialY} Z0</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
            <div>${PX_PY.join('')}</div>
            <div>F150 G1 X${initialX} Y${initialY}</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
            <div>${MX_PY.join('')}</div>
            <div>F150 G1 X${initialX} Y${initialY}</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
            <div>${MX_MY.join('')}</div>
            <div>F150 G1 X${initialX} Y${initialY}</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
            <div>${PX_MY.join('')}</div>
            <div>F150 G1 X${initialX} Y${initialY}</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
        `
        newProgramD.append(program)
    }
    // обработчик формы для радиуса
    formDiagonal.addEventListener('submit', radiusCalc)

    // главная функция расчета координат по окружности
    const circleCalc = (e) => {
        // отмена стандартного поведения браузера
        e.preventDefault()
        // очистка результатов
        newProgramC.innerHTML = ''
        // объявления переменных
        let R = +inputRadiusC.value,
            stepvalue = +inputStepValueC.value,
            initialX = +inputInitialXC.value,
            initialY = +inputInitialYC.value,
            X = +inputInitialXC.value,
            Y = +inputInitialYC.value,
            speed = +inputSpeedValueC.value,
            power = +inputPLaserC.value,
            delay = +inputDelayC.value,
            zeroDegreeAngle = 0,
            coordinates = []
        // логика расчета
        let L = 2 * Math.PI * R
        let N = L / stepvalue
        let M = Math.trunc(N - 1)
        let deltaAlpha = 360 / M
        for (let i = 0; i <= M; i++) {
            let newPX = X + (Math.cos(+(((Math.PI / 180) * zeroDegreeAngle).toFixed(2))) * R)
            let newPY = Y + (Math.sin(+(((Math.PI / 180) * zeroDegreeAngle).toFixed(2))) * R)
            coordinates.push(`X${newPX.toFixed(2)},Y${newPY.toFixed(2)}`)
            zeroDegreeAngle+=deltaAlpha
        }
        // преобразование массивов координат в основной цикл программы
        const intermediateArr = [...coordinates]
        const firsItem = intermediateArr.shift()
        let mainArr = intermediateArr.map((item) => {
            let listItem = ''
            return listItem = `
                <div>G03  ${item.split(',')[0]} ${item.split(',')[1]} R${R} F${speed}</div>
                <div>M3 S${power}</div>
                <div>G04 P${delay}.</div>
                <div>M5</div>
            `
        })
        // отображение на странице результатов расчета
        const program = document.createElement('div')
        program.classList.add('program')
        program.innerHTML = `
            <div>M5</div>
            <div>F300 G1 X${initialX} Y${initialY} Z0</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
            <div>F100 G1 ${firsItem.split(',')[0]}</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
            <div>${mainArr.join('')}</div>
            <div>F150 G1 X${initialX} Y${initialY}</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
        `
        newProgramC.append(program)
    }
    // обработчик формы для окружности
    formCircle.addEventListener('submit', circleCalc)

    // главная функция расчета координат по строчкам
    const rowsCalc = (e) => {
        // отмена стандартного поведения браузера
        e.preventDefault()
        // очистка результатов
        program.innerHTML = ''
        // объявления переменных
        // НАДО РАДИУС ОТ ПОЛЬЗОВАТЕЛЯ И ЗНАЧЕНИЕ ШАГА
        let R = +inputRadiusR.value,
            stepvalue = +inputStepValueR.value,
            initialx = +inputInitialXR.value,
            initialy = +inputInitialYR.value,
            firstAndSecondQuarters = [],
            thirdAndFourthQuarters = []

        // логика расчета
        let limitPX = initialx + R
        let limitMX = initialx - R
        let limitPY = initialy + R
        let limitMY = initialy

        
        while (limitPX >= limitMX) {
            let Ri = Math.sqrt(Math.pow((limitPX - initialx), 2) + Math.pow((limitMY - initialy), 2))

            if (Ri <= R) {
                firstAndSecondQuarters.push(`X = ${limitPX},Y = ${limitMY}`)
            } 

            if (limitPX === limitMX) {
                limitMY+=stepvalue
                limitPX = initialx + R
            } else {
                limitPX-=stepvalue
            }
            if (limitMY > limitPY) {
                break
            }
        }

        
        
        
        firstAndSecondQuarters.map(item => {
            const listItem = document.createElement('div') 
            listItem.classList.add('list')  
            listItem.innerHTML = `
                <div>M5</div>
                <div>G1 ${item.split(',')[0]} ${item.split(',')[1]}</div>
                <div>M3 S2</div>
                <div>G04 P2.</div>
                <div>M5</div>
            `
            program.append(listItem)
        })
    }
    // обработчик формы для строчек
    formRows.addEventListener('submit', rowsCalc)

    // главная функция расчета координат по столбцам
    const colsCalc = (e) => {
        // отмена стандартного поведения браузера
        e.preventDefault()
        // очистка результатов
    }
    // обработчик формы для столбцов
    formCols.addEventListener('submit', colsCalc)
})