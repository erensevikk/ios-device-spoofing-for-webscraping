import pydivert
from scapy.all import Ether, IP, TCP, sendp
import time

# iOS-like TCP/IP settings
IOS_TTL = 64
IOS_WINDOW_SIZE = 65535
IOS_MSS = 1412
IOS_WSCALE = 6
IOS_OPTIONS = [
    ("MSS", IOS_MSS),
    ("NOP", None),
    ("WScale", IOS_WSCALE),
    ("NOP", None),
    ("NOP", None),
    ("Timestamp", (0, 0)),  # Placeholder, updated dynamically
    ("SAckOK", ""),
    ("EOL", None),
    # Removed redundant ("EOL", None) unless required by iOS fingerprint
]

# Gateway MAC address
GATEWAY_MAC = "insert_your_gateway_mac"

# Network interface
INTERFACE = "Wi-Fi"

# Filter outbound TCP packets from your IP
with pydivert.WinDivert(
    "tcp and outbound and ip.SrcAddr == insert_your_ipv4_address and ip.DstAddr != 127.0.0.1"
) as w:
    print("WinDivert ile dinleniyor...")
    for packet in w:
        scapy_packet = IP(bytes(packet.raw))
        if TCP in scapy_packet:
            print(f"Yakalanan Paket: {scapy_packet.summary()}")

            # Update Timestamp within 32-bit range
            current_time = int(time.time() * 1000) % (2**32)
            IOS_OPTIONS[5] = ("Timestamp", (current_time, 0))

            # Build new IP layer
            new_ip = IP(
                src=scapy_packet[IP].src,
                dst=scapy_packet[IP].dst,
                ttl=IOS_TTL,
                flags="DF",
                id=0,
            )

            # Build new TCP layer
            new_tcp = TCP(
                sport=scapy_packet[TCP].sport,
                dport=scapy_packet[TCP].dport,
                seq=scapy_packet[TCP].seq,
                ack=scapy_packet[TCP].ack,
                window=IOS_WINDOW_SIZE,
                flags=scapy_packet[TCP].flags,
                options=IOS_OPTIONS,
            )

            # Attach payload if present
            if scapy_packet[TCP].payload:
                new_packet = new_ip / new_tcp / scapy_packet[TCP].payload
            else:
                new_packet = new_ip / new_tcp

            # Add Ethernet layer and send
            new_packet = Ether(dst=GATEWAY_MAC) / new_packet
            sendp(new_packet, iface=INTERFACE, verbose=0)
            print(
                f"Modifiye Paket: TTL={new_packet[IP].ttl}, Window={new_packet[TCP].window}"
            )
        continue
