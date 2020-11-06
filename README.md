# AvançaDEV

## Desafio 1

- Crie um microsserviço número 4 na linguagem de sua preferência e faça com que o microsserviço número 3 (de validação de cupons) faça uma chamada a ele.

- Lembre-se de adicionar uma regra de retry para caso o microsserviço 4 estiver fora do ar temporariamente, o microsserviço 3 ainda tentará algumas vezes antes de desistir.

```javascript
const http = require('http');

const host = 'localhost';
const port = 9093;

const json = JSON.stringify({
    Status: "OK",
});

const requestListen = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.writeHead(200);
    res.end(json)
}

const server = http.createServer(requestListen);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port }`)
});
```

## Desafio 2

- Inicie o RabbitMQ e faça as configurações das duas filas e das duas exchanges.

- Coloque os microsserviços para funcionar.

- Tire 3 prints de sua de sua tela mostrando os microsserviços funcionando nas 3 situações: Cupom inválido, Processed e Connection error.

### Cupom Inválido

![InvalidCoupon](./.github/invalidcoupon.png)

### Processado

![Processed](./.github/processed.png)

### Error de conexão

![Connectionerror](./.github/connectionerror.png)

## Desafio 3

- Gere uma imagem Docker para cada microsserviço criado na aula 2. (Crie um Dockerfile para cada microsserviço)

- Suba as imagens no Docker Hub

- Crie um arquivo docker-compose.yaml que seja capaz de subir todo o ambiente dos microsserviços, incluindo o RabbitMQ.

- Publique as alterações, incluindo Dockerfiles e docker-compose em seu repositório no Github.

### Dockerfile do microserviço a

```Dockerfile
FROM golang:1.15
WORKDIR /go/src/a
COPY . .
RUN GOOS=linux go build a.go

EXPOSE 9090

ENTRYPOINT ["./a"]

```

### Dockerfile do microserviço b

```Dockerfile
FROM golang:1.15
WORKDIR /go/src/b
COPY . .
RUN GOOS=linux go build b.go

ENTRYPOINT ["./b"]

```

### Dockerfile do microserviço c

```Dockerfile
FROM golang:1.15
WORKDIR /go/src/c
COPY . .
RUN GOOS=linux go build c.go

EXPOSE 9092

ENTRYPOINT ["./c"]

```

### Arquivo docker-compose.yaml

```yaml
version: '3'

services:

  rabbit:
    image: "rabbitmq:3-management"
    environment:
      RABBITMQ_ERLANG_COOKIE: "SWQOKODSQALRPCLNMEQG"
      RABBITMQ_DEFAULT_USER: "rabbitmq"
      RABBITMQ_DEFAULT_PASS: "rabbitmq"
      RABBITMQ_DEFAULT_VHOST: "/"
    ports:
      - "15672:15672"
      - "5672:5672"
  
  microsservice-a:
    image: almerindo/microservico-avancadev-a:latest
    ports:
      - 9090:9090
    environment:
      RABBITMQ_DEFAULT_HOST: rabbit
    depends_on:
      - rabbit
    links: [rabbit]
  
  microsservice-b:
    image: almerindo/microservico-avancadev-b:latest
    restart: always
    environment:
      RABBITMQ_DEFAULT_HOST: rabbit
    depends_on:
      - rabbit
    links: [rabbit]

  
  microsservice-c:
      image: almerindo/microservico-avancadev-c:latest
      ports:
        - 9092:9092
      depends_on:
        - microsservice-b
      links: [microsservice-b]
```

---

<p align="center">Desenvolvido durante o avancadev :wave:</p>
