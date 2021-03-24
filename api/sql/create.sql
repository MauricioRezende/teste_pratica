CREATE TABLE TECHNICIAN (
    id			    INT PRIMARY KEY IDENTITY (1, 1),
    name		    VARCHAR (100) NOT NULL,
    telephone	    VARCHAR (50) NOT NULL,
    email		    VARCHAR(100) NOT NULL,
    address	        VARCHAR(200) NOT NULL,
    status		    VARCHAR(20) NOT NULL,
    creation_date   DATETIME DEFAULT GETDATE(),
    change_date     DATETIME DEFAULT GETDATE()
);

CREATE TABLE ADDRESS(
    id              INT PRIMARY KEY IDENTITY (1,1),
    city            VARCHAR(100) NOT NULL,
    state           VARCHAR(100) NOT NULL,
    district        VARCHAR(100) NOT NULL,
    street          VARCHAR(100) NOT NULL,
    number          INT NOT NULL,
    complement      VARCHAR(30),
    id_technician   INT NOT NULL,
    FOREIGN KEY (id_technician) REFERENCES TECHNICIAN (id)
);