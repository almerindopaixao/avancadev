FROM golang:1.15
WORKDIR /go/src/c
COPY . .
RUN GOOS=linux go build

FROM scratch
WORKDIR /go/src/c
COPY --from=builder /go/src/c/c .

EXPOSE 9092

ENTRYPOINT [ "./c" ]