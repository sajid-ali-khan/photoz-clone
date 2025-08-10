create table if not exists photoz (
    id int auto_increment primary key,
    file_name varchar(255),
    content_type varchar(255),
    data binary large object
);