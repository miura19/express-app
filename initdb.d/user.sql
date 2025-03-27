DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (name, age) VALUES
('Alice', 25),
('Bob', 30),
('Charlie', 35),
('David', 28),
('Eva', 22),
('Frank', 40),
('Grace', 33),
('Hannah', 27),
('Ian', 26),
('Jack', 31);