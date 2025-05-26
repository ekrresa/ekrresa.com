---
title: Three Ways to Run Your Localhost Website on Mobile
tags:
  - localhost
  - 'web development'
  - ngrok
  - testing
  - localtunnel
  - wifi
  - mobile
summary: Discover three simple methods to access your localhost website directly on mobile devices.
date: 2025-05-04T16:51:42+01:00
published: true
updatedAt:
---

Web developers often need to test web applications running on `localhost` directly on mobile devices to ensure responsive design and functionality. While the browser devtools offers a basic simulation of mobile devices, it falls short in replicating real-world touch interactions, performance, and device-specific behaviors.

This article explores three effective methods to access your web server running on `localhost` in a mobile device browser.

## WiFi Network

If your development machine and mobile device are connected to the same Wi-Fi network, you can access your locally hosted website using your development machine’s IP address. This method is ideal for quick testing without external tools or internet access.

### Steps

1. Get the local IP address of your development machine.
   - **Windows**: In command prompt, run `ipconfig`. From the output, locate the `IPv4 Address` under your Wi-Fi adapter (e.g. `192.168.1.100`).
   * **MacOS**: Run `ipconfig getifaddr en0` in the terminal.
   * **Linux**: In your terminal, run `ip addr show | grep inet` or `hostname -I` to find the Wi-Fi interface IP
2. Ensure your website is running locally.
3. Make sure your mobile device and your development machine are on the same Wi-Fi network.
4. In your mobile browser, enter `http://<ip-address>:<port>`. For example, if your web server is running on port `3000` and your IP address is `192.168.1.100`, go to `http://192.168.1.100:3000` in your mobile browser.

## Localtunnel

Localtunnel is a terminal application that creates a secure, public URL which redirects all requests to your local web server. This method is ideal for quick public access, requiring only an internet connection and minimal setup.

### Steps

1. Install via npm (`npm install -g localtunnel`). For MacOS devices, `brew install localtunnel` also works.
2. Ensure your local web server is running, and your development machine has an active internet connection.
3. Run `lt --port <port>` in your terminal. This will provide a unique URL. Keep the terminal open to maintain the tunnel.
4. Copy the URL and open it in your mobile browser. You may be greeted with a security page asking for a password. Follow the instructions on the page to retrieve the password, submit it on the page and off you go.

## Ngrok

Like Localtunnel, Ngrok is a terminal application that provides a secure, public URL to your local web server with features like HTTPS, custom domains and authentication. It has a paid tier but the free tier should be sufficient for your needs.

### Steps

1. Visit [ngrok.com](https://ngrok.com/) and sign up for a free account to obtain an authentication token.
2. Download the Ngrok binary for your platform (Windows, macOS, or Linux), and install it.
3. Retrieve your authentication token from your ngrok dashboard and run `ngrok config add-authtoken <YOUR_AUTHTOKEN>` in your terminal.
4. Ensure your web server is running, and your development machine has an active internet connection.
5. Start ngrok by running `ngrok http <port>` in your terminal. This will provide a unique URL.
6. Open the URL in your mobile browser.

## Conclusion

The three approaches covered; Wi-Fi, Localtunnel, and Ngrok, offer flexible solutions tailored to different needs. The Wi-Fi method is perfect for quick, local testing without additional tools. Localtunnel provides a simple, free way to generate a public URL for fast access, ideal for temporary sharing. Ngrok delivers a secure, feature-rich option with advanced capabilities, best for remote testing or professional use.

Each method empowers developers to go beyond the limitations of the browser devtools, enabling real-world testing of touch interactions, performance, and device-specific behaviors. Always secure your setup and verify functionality on real devices to ensure a robust user experience.
