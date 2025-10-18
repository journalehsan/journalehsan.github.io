# XCopy in Rust and libadwaita with GTK4

*April 2024 · Rust · GTK4 · libadwaita · File Management*

## Overview

XCopy is a simple and efficient file copying tool built using Rust and libadwaita with GTK4. It provides a user-friendly interface for copying files and directories, with features such as progress tracking, error handling, and customizable options. XCopy is designed to be lightweight and fast, making it an ideal choice for users who need a reliable file copying solution.

## Why XCopy?

### Modern Interface
Built with GTK4 and libadwaita for a native, modern Linux desktop experience that follows GNOME design principles.

### High Performance
Rust backend ensures fast file operations with efficient memory management and error handling.

### User-Friendly Design
Intuitive interface designed for both beginners and advanced users with clear progress indicators and error messages.

### Reliability
Robust error handling and verification ensure data integrity during file operations.

## Key Features

### Modern GTK4 Interface
Built using libadwaita and GTK4 for a modern and intuitive user experience that integrates seamlessly with GNOME desktop environments.

### Progress Tracking
Real-time progress indicators showing:
- Current file being copied
- Overall progress percentage
- Transfer speed
- Estimated time remaining

### Error Handling
Comprehensive error handling with:
- Detailed error messages
- Options for handling copy conflicts
- Resume capability for interrupted transfers
- File verification after copying

### Customizable Options
Flexible configuration options:
- Buffer size adjustment for optimal performance
- Overwrite behavior settings
- File filtering and exclusion patterns
- Transfer speed limiting

### Drag-and-Drop Support
Intuitive file management with drag-and-drop functionality for easy file selection and organization.

### Batch Operations
Efficient handling of multiple files and directories:
- Queue management for large operations
- Parallel processing capabilities
- Progress tracking for batch operations

### Lightweight Performance
Minimal resource usage with efficient operation even for large file transfers.

## Technical Architecture

### Rust Backend
High-performance backend built in Rust:
- Memory-safe file operations
- Efficient async I/O operations
- Robust error handling and recovery
- Cross-platform compatibility

### GTK4 Frontend
Modern graphical interface:
- Native look and feel on GNOME
- Responsive UI with smooth animations
- Accessibility support
- Dark/light theme support

### libadwaita Integration
Enhanced user experience with:
- Consistent design language
- Adaptive layouts
- Modern UI components
- GNOME ecosystem integration

## Installation

### AppImage
Download the portable AppImage from releases for universal Linux compatibility.

### Arch Linux (AUR)
```bash
yay -S xcopy
# or
paru -S xcopy
```

### Source Compilation
```bash
git clone https://github.com/journalehsan/XCopy
cd XCopy
cargo build --release
```

### Flatpak (Coming Soon)
Flatpak package for easy installation and sandboxing.

## Use Cases

### File Management
Perfect for organizing and managing files across different locations and storage devices.

### Backup Operations
Reliable tool for creating backups with progress tracking and error handling.

### System Migration
Efficient file copying during system upgrades or migrations.

### Media Transfer
Ideal for transferring large media files with progress monitoring.

### Development Workflows
Useful for copying project files and managing development environments.

## Advanced Features

### Resume Capability
Resume interrupted transfers from where they left off, saving time on large operations.

### File Verification
Verify file integrity after copying using checksums to ensure data accuracy.

### Transfer Speed Limiting
Control transfer speed to avoid overwhelming network or storage resources.

### Conflict Resolution
Smart conflict resolution for handling duplicate files and naming conflicts.

### Queue Management
Advanced queue system for managing multiple copy operations efficiently.

## Performance Benefits

### Fast Transfers
Optimized Rust backend provides faster file operations compared to traditional tools.

### Memory Efficiency
Efficient memory usage prevents system slowdown during large transfers.

### CPU Optimization
Minimal CPU usage during file operations, leaving resources for other applications.

### Network Optimization
Smart buffering and chunking for optimal network file transfers.

## Getting Started

1. **Download and Install** XCopy for your Linux system
2. **Launch** the application from your applications menu
3. **Select Source** files or directories to copy
4. **Choose Destination** folder for the copy operation
5. **Configure Options** if needed (buffer size, overwrite behavior)
6. **Start Copying** and monitor progress
7. **Verify Results** using built-in verification features

## Configuration Options

### Buffer Size
Adjust transfer buffer size based on your system and storage characteristics.

### Overwrite Behavior
Configure how to handle existing files:
- Always overwrite
- Skip existing files
- Prompt for each conflict
- Rename conflicting files

### Progress Display
Customize progress information display:
- Detailed file information
- Transfer speed indicators
- Time estimates
- Completion notifications

## Conclusion

XCopy is an excellent choice for Linux users seeking a reliable and efficient file copying tool. Its Rust implementation and modern GTK4 interface make it a standout option for managing file transfers on Linux systems.

---

**Links:**
- [GitHub Repository](https://github.com/journalehsan/XCopy)
- [License: APL-2.0](https://www.apache.org/licenses/LICENSE-2.0)
