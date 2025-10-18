# Network Manager TUI (nmtui)

*January 2024 · Rust · Terminal · Linux*

## Overview

Network Manager TUI (nmtui) is a text-based user interface for managing network connections on Linux systems. It provides a simple and efficient way to configure and monitor network settings without the need for a graphical interface. nmtui is particularly useful for server environments or systems with limited resources where a GUI is not available.

## Why Network Manager TUI?

### Server Environments
Perfect for headless servers and systems without graphical interfaces where traditional network configuration tools are not available.

### Resource Efficiency
Lightweight terminal-based interface that consumes minimal system resources compared to graphical network managers.

### Remote Administration
Enables network configuration over SSH connections and remote terminal sessions.

### Automation Friendly
Integrates well with automated deployment and configuration management systems.

## Key Features

### Text-based Interface
Operates entirely in the terminal, making it suitable for headless systems and remote administration.

### Network Configuration
Comprehensive network management capabilities:
- Create new network connections
- Edit existing connection settings
- Delete unwanted connections
- Configure static and dynamic IP addresses

### Wi-Fi Management
Advanced wireless network support:
- Connect to Wi-Fi networks
- Manage saved Wi-Fi profiles
- Configure wireless security settings
- Monitor Wi-Fi signal strength

### IWD Support
Compatible with the IWD (iNet Wireless Daemon) for modern wireless network management on systemd-based systems.

### Enterprise Wi-Fi Support
Supports enterprise Wi-Fi networks with 802.1X authentication for corporate and educational environments.

## Technical Architecture

### Built with Rust
- High performance and memory safety
- Cross-platform compatibility
- Modern async/await support for network operations

### Systemd Integration
Seamless integration with systemd network management and service dependencies.

### NetworkManager Backend
Leverages the robust NetworkManager daemon for reliable network configuration and management.

## Installation

### Package Managers
Install via your distribution's package manager:
```bash
# Arch Linux
sudo pacman -S networkmanager-tui

# Ubuntu/Debian
sudo apt install network-manager-tui

# Fedora/RHEL
sudo dnf install NetworkManager-tui
```

### Source Compilation
Build from source for custom configurations or bleeding-edge features.

## Use Cases

### Server Administration
Essential for configuring network settings on headless servers and cloud instances.

### Development Environments
Perfect for development VMs and containers that need network configuration.

### Remote Management
Ideal for managing network settings over SSH connections.

### Minimal Installations
Excellent for minimal Linux installations where GUI components are not desired.

## Getting Started

1. **Install** Network Manager TUI on your Linux system
2. **Launch** the application from the terminal: `sudo nmtui`
3. **Navigate** through the menu using arrow keys
4. **Configure** network connections as needed
5. **Save** and activate your network settings

## Advanced Features

### Connection Profiles
Create and manage multiple network profiles for different environments.

### VPN Integration
Configure VPN connections through the TUI interface.

### Bonding and Bridging
Set up network bonding and bridging for advanced network configurations.

### DNS Management
Configure custom DNS servers and search domains.

## Conclusion

Network Manager TUI (nmtui) is an essential tool for Linux users who need to manage network connections in a terminal environment. Its text-based interface and robust features make it a reliable choice for configuring and monitoring network settings on various Linux distributions.

---

**Links:**
- [Website](https://github.com/journalehsan/network_manager_ui)
- [GitHub Repository](https://github.com/journalehsan/network_manager_ui)
- [License: APL-2.0](https://www.apache.org/licenses/LICENSE-2.0)
