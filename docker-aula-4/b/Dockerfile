FROM golang:1.15
WORKDIR /go/src/b
COPY . .
RUN GOOS=linux go build

FROM scratch
WORKDIR /go/src/b
COPY --from=builder /go/src/b/b .

EXPOSE 9091

ENTRYPOINT [ "./b" ]