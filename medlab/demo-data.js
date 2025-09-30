<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация - LabHome</title>
    <style>
        /* Используем те же стили что и в index.html */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }
        
        body {
            background-color: #f8f9fa;
            color: #333;
            line-height: 1.6;
        }
        
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 0;
        }
        
        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.8rem;
            font-weight: bold;
        }
        
        /* Форма регистрации */
        .auth-container {
            max-width: 500px;
            margin: 3rem auto;
            padding: 2rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .auth-form h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: #333;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
        }
        
        .form-group input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .btn {
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s;
            font-size: 1rem;
            width: 100%;
        }
        
        .btn-primary {
            background: #28a745;
            color: white;
            border: 2px solid #28a745;
        }
        
        .btn-primary:hover {
            background: #218838;
            border-color: #218838;
        }
        
        .auth-links {
            text-align: center;
            margin-top: 1.5rem;
        }
        
        .auth-links a {
            color: #667eea;
            text-decoration: none;
        }
        
        footer {
            background: #333;
            color: white;
            padding: 2rem 0;
            text-align: center;
            margin-top: 3rem;
        }
    </style>
</head>
<body>
    <!-- Шапка -->
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">LabHome</div>
                <nav>
                    <a href="index.html" style="color: white; text-decoration: none;">← На главную</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Форма регистрации -->
    <div class="container">
        <div class="auth-container">
            <div class="auth-form">
                <h2>Создать аккаунт</h2>
                <form>
                    <div class="form-group">
                        <label for="fullname">ФИО</label>
                        <input type="text" id="fullname" name="fullname" required placeholder="Иванов Иван Иванович">
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required placeholder="example@mail.ru">
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Телефон</label>
                        <input type="tel" id="phone" name="phone" required placeholder="+7 (999) 123-45-67">
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Пароль</label>
                        <input type="password" id="password" name="password" required placeholder="Не менее 6 символов">
                    </div>
                    
                    <div class="form-group">
                        <label for="confirm-password">Подтвердите пароль</label>
                        <input type="password" id="confirm-password" name="confirm-password" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
                </form>
                
                <div class="auth-links">
                    <p>Уже есть аккаунт? <a href="login.html">Войдите</a></p>
                </div>
            </div>
        </div>
    </div>

    <!-- Футер -->
    <footer>
        <div class="container">
            <p>&copy; 2024 LabHome. Все права защищены.</p>
            <p>📞 8 (800) 123-45-67 | ✉️ info@labhome.ru</p>
        </div>
    </footer>
</body>
</html>
