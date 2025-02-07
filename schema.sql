DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO todos (title, description) VALUES
("title 1", "desc 1"),
("title 2", "desc 2"),
("title 3", "desc 3"),
("title 4", "desc 4");
