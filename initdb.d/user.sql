DROP TABLE IF EXISTS users;

CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

INSERT INTO
    users (name, email, password)
VALUES
    ('Alice', 'alice@example.com', 'password_1'),
    ('Bob', 'bob@example.com', 'password_2'),
    ('Charlie', 'charlie@example.com', 'password_3'),
    ('David', 'david@example.com', 'password_4'),
    ('Eva', 'eva@example.com', 'password_5'),
    ('Frank', 'frank@example.com', 'password_6'),
    ('Grace', 'grace@example.com', 'password_7'),
    ('Hannah', 'hannah@example.com', 'password_8'),
    ('Ian', 'ian@example.com', 'password_9'),
    ('Jack', 'jack@example.com', 'password_10'),
    ('Kelly', 'kelly@example.com', 'password_11'),
    ('Liam', 'liam@example.com', 'password_12'),
    ('Mia', 'mia@example.com', 'password_13'),
    ('Noah', 'noah@example.com', 'password_14'),
    ('Olivia', 'olivia@example.com', 'password_15');