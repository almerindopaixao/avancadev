FROM golang:1.15
WORKDIR /go/src/b
COPY . .
RUN GOOS=linux go build b.go

ENTRYPOINT ["./b"]