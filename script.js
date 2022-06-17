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
            inputSpeedValueR = document.querySelector('.speed_r'),
            inputPLaserR = document.querySelector('.PLaser_r'),
            inputDelayR = document.querySelector('.delay_r'),
            newProgramQuarter_1_2 = document.querySelector('.quarter_1_2_r'),
            newProgramQuarter_3_4 = document.querySelector('.quarter_3_4_r')

    const formCols = document.querySelector('.form_cols'),
            inputRadiusCols = document.querySelector('.radius_cols'),
            inputStepValueCols = document.querySelector('.stepvalue_cols'),
            inputInitialXCols = document.querySelector('.initialx_cols'),
            inputInitialYCols = document.querySelector('.initialy_cols'),
            inputSpeedValueCols = document.querySelector('.speed_cols'),
            inputPLaserCols = document.querySelector('.PLaser_cols'),
            inputDelayCols = document.querySelector('.delay_cols'),
            newProgramQuarter_1_4 = document.querySelector('.quarter_1_4_cols'),
            newProgramQuarter_2_3 = document.querySelector('.quarter_2_3_cols')

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
            <div>G04 P${delay}.</div>
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
        newProgramQuarter_1_2.innerHTML = ''
        newProgramQuarter_3_4.innerHTML = ''
        // объявления переменных
        let R = +inputRadiusR.value,
            stepvalue = +inputStepValueR.value,
            initialx = +inputInitialXR.value,
            initialy = +inputInitialYR.value,
            speed = +inputSpeedValueR.value,
            power = +inputPLaserR.value,
            delay = +inputDelayR.value,
            quarters_1_2 = [],
            quarters_3_4 = []

        // логика расчета
        // лимиты для 1 и 2 четверти
        let limitPX_1_2 = initialx + R
        let limitMX_1_2 = initialx - R
        let limitPY_1_2 = initialy + R
        let limitMY_1_2 = initialy

        // лимиты для 3 и 4 четверти
        let limitPX_3_4 = initialx + R
        let limitMX_3_4 = initialx - R
        let limitPY_3_4 = initialy
        let limitMY_3_4 = initialy - R

        // основной цикл генерации программы перемещения для 1 и 2 четверти
        while (limitPX_1_2 >= limitMX_1_2 || limitPX_1_2 < limitMX_1_2) {
            let Ri = Math.sqrt(Math.pow((limitPX_1_2 - initialx), 2) + Math.pow((limitMY_1_2 - initialy), 2))
            
            if (Ri <= R) {
                quarters_1_2.push(`X${+limitPX_1_2.toFixed(2)},Y${+limitMY_1_2.toFixed(2)}`)  
            } 

            if (limitPX_1_2 <= limitMX_1_2) {
                limitMY_1_2+=stepvalue
                limitPX_1_2 = initialx + R
            } else {
                limitPX_1_2-=stepvalue
            }

            if (limitMY_1_2 > limitPY_1_2) {
                break
            }
        }

        // основной цикл генерации программы перемещения для 3 и 4 четверти
        while (limitPX_3_4 >= limitMX_3_4 || limitPX_3_4 < limitMX_3_4) {
            let Ri = Math.sqrt(Math.pow((limitPX_3_4 - initialx), 2) + Math.pow((limitPY_3_4 - initialy), 2))

            if (Ri <= R) {
                quarters_3_4.push(`X${+limitPX_3_4.toFixed(2)},Y${+limitPY_3_4.toFixed(2)}`)
            } 

            if (limitPX_3_4 <= limitMX_3_4) {
                limitPY_3_4-=stepvalue
                limitPX_3_4 = initialx + R
            } else {
                limitPX_3_4-=stepvalue
            }

            if (limitPY_3_4 < limitMY_3_4) {
                break
            }
        }

        // преобразование массивов координат в основной цикл программы
        const intermediateArr_1 = [...quarters_1_2]
        const firsItem_1 = intermediateArr_1.shift()
        let finalQuarter_1_2 = intermediateArr_1.map((item) => {
            let listItem = ''
            return listItem = `
                <div>F${speed} G1 ${item.split(',')[0]} ${item.split(',')[1]}</div>
                <div>M3 S${power}</div>
                <div>G04 P${delay}.</div>
                <div>M5</div>
            `
        })

        const intermediateArr_2 = [...quarters_3_4]
        const firsItem_2 = intermediateArr_2.shift()
        let finalQuarter_3_4 = intermediateArr_2.map((item) => {
            let listItem = ''
            return listItem = `
                <div>F${speed} G1 ${item.split(',')[0]} ${item.split(',')[1]}</div>
                <div>M3 S${power}</div>
                <div>G04 P${delay}.</div>
                <div>M5</div>
            `
        })

        // отображение на странице результатов расчета
        const program_1_2 = document.createElement('div')
        program_1_2.classList.add('program_rows-cols')
        program_1_2.innerHTML = `
            <div>M5</div>
            <div>F300 G1 X${initialx} Y${initialy} Z0</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
            <div>F100 G1 ${firsItem_1.split(',')[0]}</div>
            <div>M3 S${power}</div>
            <div>G04 P${delay}.</div>
            <div>M5</div>
            <div>${finalQuarter_1_2.join('')}</div>
            <div>F150 G1 X${initialx} Y${initialy}</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
        `

        const program_3_4 = document.createElement('div')
        program_3_4.classList.add('program_rows-cols')
        program_3_4.innerHTML = `
            <div>M5</div>
            <div>F300 G1 X${initialx} Y${initialy} Z0</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
            <div>F100 G1 ${firsItem_2.split(',')[0]}</div>
            <div>M3 S${power}</div>
            <div>G04 P${delay}.</div>
            <div>M5</div>
            <div>${finalQuarter_3_4.join('')}</div>
            <div>F150 G1 X${initialx} Y${initialy}</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
        `
        newProgramQuarter_1_2.append(program_1_2)
        newProgramQuarter_3_4.append(program_3_4)
        
    }
    // обработчик формы для строчек
    formRows.addEventListener('submit', rowsCalc)

    // главная функция расчета координат по столбцам
    const colsCalc = (e) => {
        // отмена стандартного поведения браузера
        e.preventDefault()
        // очистка результатов
        newProgramQuarter_1_4.innerHTML = ''
        newProgramQuarter_2_3.innerHTML = ''
        // объявления переменных
        let R = +inputRadiusCols.value,
            stepvalue = +inputStepValueCols.value,
            initialx = +inputInitialXCols.value,
            initialy = +inputInitialYCols.value,
            speed = +inputSpeedValueCols.value,
            power = +inputPLaserCols.value,
            delay = +inputDelayCols.value,
            quarters_1_4 = [],
            quarters_2_3 = []

        // логика расчета
        // лимиты для 1 и 4 четверти
        let limitPX_1_4 = initialx + R
        let limitMX_1_4 = initialx
        let limitPY_1_4 = initialy + R
        let limitMY_1_4 = initialy - R
        
        // лимиты для 2 и 3 четверти
        let limitPX_2_3 = initialx
        let limitMX_2_3 = initialx - R
        let limitPY_2_3 = initialy + R
        let limitMY_2_3 = initialy - R

        // основной цикл генерации программы перемещения для 1 и 4 четверти
        while (limitPY_1_4 >= limitMY_1_4 || limitPY_1_4 < limitMY_1_4) {
            let Ri = Math.sqrt(Math.pow((limitMX_1_4 - initialx), 2) + Math.pow((limitPY_1_4 - initialy), 2))
            
            if (Ri <= R) {
                quarters_1_4.push(`X${+limitMX_1_4.toFixed(2)},Y${+limitPY_1_4.toFixed(2)}`)  
            } 

            if (limitPY_1_4 <= limitMY_1_4) {
                limitMX_1_4+=stepvalue
                limitPY_1_4 = initialy + R
            } else {
                limitPY_1_4-=stepvalue
            }

            if (limitMX_1_4 > limitPX_1_4) {
                break
            }
        }

        // основной цикл генерации программы перемещения для 2 и 3 четверти
        while (limitPY_2_3 >= limitMY_2_3 || limitPY_2_3 < limitMY_2_3) {
            let Ri = Math.sqrt(Math.pow((limitPX_2_3 - initialx), 2) + Math.pow((limitPY_2_3 - initialy), 2))
            console.log('+y', limitPY_2_3)
            console.log('-y', limitMY_2_3)
            console.log('+x', limitPX_2_3)
            console.log('-x', limitMX_2_3)
            console.log('-----------------')
            if (Ri <= R) {
                quarters_2_3.push(`X${+limitPX_2_3.toFixed(2)},Y${+limitPY_2_3.toFixed(2)}`)
            } 

            if (limitPY_2_3 <= limitMY_2_3) {
                limitPX_2_3-=stepvalue
                limitPY_2_3 = initialy + R
            } else {
                limitPY_2_3-=stepvalue
            }

            if (limitPX_2_3 < limitMX_2_3) {
                break
            }
        }

        // преобразование массивов координат в основной цикл программы
        const intermediateArr_1 = [...quarters_1_4]
        const firsItem_1 = intermediateArr_1.shift()
        let finalQuarter_1_4 = intermediateArr_1.map((item) => {
            let listItem = ''
            return listItem = `
                <div>F${speed} G1 ${item.split(',')[0]} ${item.split(',')[1]}</div>
                <div>M3 S${power}</div>
                <div>G04 P${delay}.</div>
                <div>M5</div>
            `
        })

        const intermediateArr_2 = [...quarters_2_3]
        const firsItem_2 = intermediateArr_2.shift()
        let finalQuarter_2_3 = intermediateArr_2.map((item) => {
            let listItem = ''
            return listItem = `
                <div>F${speed} G1 ${item.split(',')[0]} ${item.split(',')[1]}</div>
                <div>M3 S${power}</div>
                <div>G04 P${delay}.</div>
                <div>M5</div>
            `
        })

        // отображение на странице результатов расчета
        const program_1_4 = document.createElement('div')
        program_1_4.classList.add('program_rows-cols')
        program_1_4.innerHTML = `
            <div>M5</div>
            <div>F300 G1 X${initialx} Y${initialy} Z0</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
            <div>F100 G1 ${firsItem_1.split(',')[1]}</div>
            <div>M3 S${power}</div>
            <div>G04 P${delay}.</div>
            <div>M5</div>
            <div>${finalQuarter_1_4.join('')}</div>
            <div>F150 G1 X${initialx} Y${initialy}</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
        `

        const program_2_3 = document.createElement('div')
        program_2_3.classList.add('program_rows-cols')
        program_2_3.innerHTML = `
            <div>M5</div>
            <div>F300 G1 X${initialx} Y${initialy} Z0</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
            <div>F100 G1 ${firsItem_2.split(',')[1]}</div>
            <div>M3 S${power}</div>
            <div>G04 P${delay}.</div>
            <div>M5</div>
            <div>${finalQuarter_2_3.join('')}</div>
            <div>F150 G1 X${initialx} Y${initialy}</div>
            <div>M3 S${power}</div>
            <div>G04 P4.</div>
            <div>M5</div>
        `
        newProgramQuarter_1_4.append(program_1_4)
        newProgramQuarter_2_3.append(program_2_3)
    }
    // обработчик формы для столбцов
    formCols.addEventListener('submit', colsCalc)
})


// let file = new File([json_string], "file.txt", {
//     type: "text/plain",
//     });
    
//     let link = document.createElement('a');
//     link.download = file.name;
    
//     link.href = URL.createObjectURL(file);
//     link.click();
//     URL.revokeObjectURL(link.href);