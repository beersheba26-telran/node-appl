export default interface LoggerFormatter {
    format(message: string): string
}