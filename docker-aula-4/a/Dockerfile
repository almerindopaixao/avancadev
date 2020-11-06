FROM golang:1.15
WORKDIR /go/src/a
COPY . .
RUN GOOS=linux go build

FROM scratch
WORKDIR /go/src/a
COPY --from=builder /go/src/a/a .

EXPOSE 9090

ENTRYPOINT [ "./a" ]