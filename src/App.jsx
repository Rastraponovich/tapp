import React, { useEffect, useState } from "react"
import WebApp from "@twa-dev/sdk"

function App() {
    const [user, setUser] = useState(null)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        // Инициализация приложения
        WebApp.ready()

        // Устанавливаем заголовок в интерфейсе Telegram
        WebApp.setHeaderColor("secondary_bg_color")

        // Получаем данные о пользователе
        const initData = WebApp.initDataUnsafe
        if (initData.user) {
            setUser(initData.user)
        }

        // Настраиваем основную кнопку
        if (WebApp.MainButton.isVisible) {
            WebApp.MainButton.hide()
        }
    }, [])

    const increaseCounter = () => {
        setCounter((prev) => prev + 1)
    }

    const shareResult = () => {
        if (counter > 0) {
            WebApp.MainButton.setText("Поделиться результатом")
            WebApp.MainButton.show()
            WebApp.MainButton.onClick(() => {
                WebApp.showAlert(`Вы нажали кнопку ${counter} раз!`)
            })
        }
    }

    return (
        <div className="container">
            <h1>Telegram Mini App</h1>

            {user && (
                <div className="user-info">
                    <p>Привет, {user.first_name}!</p>
                </div>
            )}

            <div className="counter">
                <p>Вы нажали кнопку: {counter} раз</p>
                <button className="button" onClick={increaseCounter}>
                    Увеличить счетчик
                </button>
                <button
                    className="button"
                    onClick={shareResult}
                    style={{ marginLeft: "10px" }}
                >
                    Показать результат
                </button>
            </div>
        </div>
    )
}

export default App
