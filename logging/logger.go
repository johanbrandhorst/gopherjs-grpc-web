package logging

import (
	"time"

	"github.com/gopherjs/gopherjs/js"
)

// LogLevel is a goog.log.Logger.Level
type LogLevel struct {
	*js.Object
	Name  string `js:"name"`
	Value int    `js:"value"`
}

var levelObj = js.Global.Get("goog").Get("log").Get("Level")

// Valid LogLevels
var (
	OFF     = &LogLevel{Object: levelObj.Get("OFF")}
	SHOUT   = &LogLevel{Object: levelObj.Get("SHOUT")}
	SEVERE  = &LogLevel{Object: levelObj.Get("SEVERE")}
	WARNING = &LogLevel{Object: levelObj.Get("WARNING")}
	INFO    = &LogLevel{Object: levelObj.Get("INFO")}
	CONFIG  = &LogLevel{Object: levelObj.Get("CONFIG")}
	FINE    = &LogLevel{Object: levelObj.Get("FINE")}
	FINER   = &LogLevel{Object: levelObj.Get("FINER")}
	FINEST  = &LogLevel{Object: levelObj.Get("FINEST")}
	ALL     = &LogLevel{Object: levelObj.Get("ALL")}
)

// LogRecord encapsulates a goog.log.LogRecord
type LogRecord struct {
	*js.Object
}

// Message gets the message associated with this LogRecord
func (l *LogRecord) Message() string {
	return l.Call("getMessage").String()
}

// Timestamp gets the time this LogRecord was logged
func (l *LogRecord) Timestamp() time.Time {
	millis := l.Call("getMillis").Int64()
	secs := millis / 1000
	nanos := (millis % 1000) * 1000000
	return time.Unix(secs, nanos)
}

// GetLevel gets the LogLevel of the LogRecord
func (l *LogRecord) GetLevel() *LogLevel {
	return &LogLevel{
		Object: l.Call("getLevel"),
	}
}

// Logger encapsulates a goog.log.Logger
type Logger struct {
	*js.Object
}

// GetLevel returns the LogLevel of the Logger
func (l *Logger) GetLevel() *LogLevel {
	return &LogLevel{
		Object: l.Call("getLevel"),
	}
}

// SetLevel sets the logger level
func (l *Logger) SetLevel(level *LogLevel) {
	l.Call("setLevel", level)
}

// AddHandler adds a log handler to the Logger
func (l *Logger) AddHandler(handler func(*LogRecord)) {
	l.Call("addHandler", handler)
}

// Log logs a message at the specific LogLevel
func (l *Logger) Log(level *LogLevel, message string) {
	l.Call("log", level, message)
}

// Shout logs a message at SHOUT level
func (l *Logger) Shout(message string) {
	l.Log(SHOUT, message)
}

// Severe logs a message at SEVERE level
func (l *Logger) Severe(message string) {
	l.Log(SEVERE, message)
}

// Warning logs a message at WARNING level
func (l *Logger) Warning(message string) {
	l.Log(WARNING, message)
}

// Info logs a message at INFO level
func (l *Logger) Info(message string) {
	l.Log(INFO, message)
}

// Config logs a message at CONFIG level
func (l *Logger) Config(message string) {
	l.Log(CONFIG, message)
}

// Fine logs a message at FINE level
func (l *Logger) Fine(message string) {
	l.Log(FINE, message)
}

// Finer logs a message at FINER level
func (l *Logger) Finer(message string) {
	l.Log(FINER, message)
}

// Finest logs a message at FINEST level
func (l *Logger) Finest(message string) {
	l.Log(FINEST, message)
}

// GetRootLogger returns the root Logger instance
func GetRootLogger() *Logger {
	return GetLogger("")
}

// GetLogger returns the Logger instance for the provided package
func GetLogger(packageName string) *Logger {
	return &Logger{
		Object: js.Global.Get("goog").Get("log").Call("getLogger", packageName),
	}
}

// StandardHandler provides a simple log handler
// which logs the level, timestamp and message of the log record
func StandardHandler(l *LogRecord) {
	println(l.GetLevel().Name + "[" + l.Timestamp().Format("Jan 02 15:04:05.000") + "] " + l.Message())
}
