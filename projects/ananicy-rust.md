# Ananicy in Rust

*February 2024 · Rust · Systemd · Process Management*

## Overview

Ananicy in Rust is a reimplementation of ananicy using the Rust programming language, aiming to provide better performance, safety, and maintainability. It automatically adjusts the CPU and nice levels of processes based on predefined profiles, optimizing system responsiveness and resource allocation.

## What is Ananicy?

Ananicy (Automatic Nice and I/O Scheduler) is a daemon designed to automatically adjust the nice levels of processes based on predefined rules. It helps optimize system performance by giving higher priority to interactive applications and lower priority to background tasks.

## Why Rust Implementation?

### Performance Improvements
- **Memory Safety**: Rust's ownership system prevents memory leaks and crashes
- **Zero-cost Abstractions**: High-level features without runtime overhead
- **Concurrent Processing**: Safe parallelism for better performance

### Reliability
- **Compile-time Guarantees**: Many runtime errors caught at compile time
- **Thread Safety**: Rust's type system ensures thread-safe operations
- **Resource Management**: Automatic cleanup and resource management

### Maintainability
- **Modern Language Features**: Pattern matching, error handling, and modules
- **Strong Typing**: Prevents common bugs and improves code quality
- **Active Community**: Growing ecosystem and community support

## Key Features

### Automatic Process Priority Management
Dynamically adjusts process priorities based on predefined profiles, ensuring optimal system responsiveness.

### Profile-based Configuration
Create and manage profiles for different types of processes:
- **Interactive Applications**: Higher priority for user-facing applications
- **Background Services**: Lower priority for system services
- **Media Applications**: Optimized settings for audio/video processing
- **Development Tools**: Balanced priorities for development environments

### Cgroup v2 Support
Full compatibility with modern cgroup v2 for advanced resource management and isolation.

### Systemd Integration
Seamless integration with systemd for service management, logging, and dependency handling.

### Lightweight Operation
Minimal resource usage with efficient process monitoring and priority adjustment.

### Open Source
Free to use and modify under the APL-2.0 License with active community development.

## Technical Architecture

### Rust Backend
Built entirely in Rust for:
- Memory safety and performance
- Concurrent process monitoring
- Efficient system resource usage

### Configuration System
Flexible configuration management:
- JSON-based profile definitions
- Runtime profile reloading
- Custom rule creation and management

### Process Monitoring
Real-time process monitoring and priority adjustment:
- Efficient process discovery
- Priority calculation algorithms
- Automatic rule application

## Installation

### Arch Linux (AUR)
```bash
yay -S rust-ananicy
# or
paru -S rust-ananicy
```

### Source Compilation
```bash
git clone https://github.com/journalehsan/rust-ananicy
cd rust-ananicy
cargo build --release
sudo cp target/release/rust-ananicy /usr/local/bin/
```

### Systemd Service Setup
```bash
sudo cp rust-ananicy.service /etc/systemd/system/
sudo systemctl enable rust-ananicy
sudo systemctl start rust-ananicy
```

## Configuration

### Default Profiles
Pre-configured profiles for common applications:
- Web browsers (Firefox, Chrome, Edge)
- Media players (VLC, mpv, Spotify)
- Development tools (VS Code, IntelliJ, Eclipse)
- System services and daemons

### Custom Profiles
Create custom profiles for specific applications:
```json
{
  "name": "my-app",
  "nice": -5,
  "ionice_class": "1",
  "ionice_prio": "4"
}
```

## Use Cases

### Desktop Optimization
Improve responsiveness of desktop applications and reduce system lag.

### Gaming Performance
Optimize gaming performance by giving games higher priority while reducing background process impact.

### Development Workflows
Balance development tool performance with system resource usage.

### Server Environments
Optimize server performance by managing process priorities for different services.

## Performance Benefits

### System Responsiveness
- Faster application startup times
- Reduced input lag
- Smoother multitasking experience

### Resource Efficiency
- Better CPU utilization
- Improved I/O scheduling
- Reduced system overhead

### Battery Life (Laptops)
- Optimized power usage
- Better thermal management
- Extended battery runtime

## Getting Started

1. **Install** rust-ananicy on your Linux system
2. **Enable** the systemd service
3. **Configure** profiles for your applications
4. **Monitor** system performance improvements
5. **Customize** rules based on your usage patterns

## Advanced Features

### Rule Inheritance
Profiles can inherit from parent categories for consistent behavior.

### Conditional Rules
Apply rules based on system conditions like battery status or load.

### Logging and Monitoring
Comprehensive logging for troubleshooting and performance analysis.

### Hot Reloading
Reload configuration without restarting the service.

## Conclusion

Ananicy in Rust is a valuable tool for Linux users looking to optimize process management and system performance. Its Rust implementation ensures reliability and efficiency, making it a great choice for managing CPU and nice levels of processes on Linux systems.

---

**Links:**
- [GitHub Repository](https://github.com/journalehsan/rust-ananicy)
- [License: APL-2.0](https://www.apache.org/licenses/LICENSE-2.0)
