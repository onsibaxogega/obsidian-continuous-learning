
# Google Cloud Security Infrastructure

- Nine of Google's services have more than one billion users each — security is always a top priority. Design for security is prevalent throughout the infrastructure that Google Cloud and Google services run on.
- The security infrastructure is explained in progressive layers, from physical data center security up through operational security.

## 1. Hardware infrastructure layer

- **Hardware design and provenance** — server boards and networking equipment are custom-designed by Google. Google also designs custom chips, including a hardware security chip deployed on both servers and peripherals.
- **Secure boot stack** — Google server machines use technologies to ensure they boot the correct software stack, such as cryptographic signatures over the BIOS, bootloader, kernel, and base operating system image.
- **Premises security** — Google designs and builds its own data centers with multiple layers of physical security. Access is limited to a very small number of employees. For servers hosted in third-party data centers, Google ensures Google-controlled physical security measures on top of the data center operator's security layers.

## 2. Service deployment layer

- **Encryption of inter-service communication** — Google's infrastructure provides cryptographic privacy and integrity for remote procedure call (RPC) data on the network. All infrastructure RPC traffic between data centers is automatically encrypted. Google is deploying hardware cryptographic accelerators to extend this default encryption to all RPC traffic inside data centers as well.

## 3. User identity layer

- **Risk-based authentication** — Google's central identity service goes beyond username and password. It intelligently challenges users for additional information based on risk factors, such as whether they have logged in from the same device or a similar location before.
- **Secondary factors** — users can employ secondary factors when signing in, including devices based on the Universal 2nd Factor (U2F) open standard.

## 4. Storage services layer

- **Encryption at rest** — most applications at Google access physical storage indirectly via storage services, and encryption using centrally managed keys is applied at the storage services layer. Google also enables hardware encryption support in hard drives and SSDs.

## 5. Internet communication layer

- **Google Front End (GFE)** — Google services made available on the internet register with the GFE, which ensures all TLS connections are ended using a public-private key pair and an X.509 certificate from a Certified Authority (CA). It follows best practices such as supporting perfect forward secrecy. The GFE also applies protections against denial of service attacks.
- **DoS protection** — the sheer scale of Google's infrastructure enables it to absorb many DoS attacks. Google also has multi-tier, multi-layer DoS protections that further reduce the risk of any DoS impact on a service running behind a GFE.

## 6. Operational security layer

- **Intrusion detection** — rules and machine intelligence give operational security teams warnings of possible incidents. Google conducts Red Team exercises to measure and improve the effectiveness of its detection and response mechanisms.
- **Reducing insider risk** — Google aggressively limits and actively monitors the activities of employees who have been granted administrative access to the infrastructure.
- **Employee U2F use** — to guard against phishing attacks, employee accounts require use of U2F-compatible security keys.
- **Stringent software development practices** — Google employs central source control and requires two-party review of new code. Developers are provided libraries that prevent them from introducing certain classes of security bugs. Google also runs a Vulnerability Rewards Program, paying anyone who discovers and reports bugs in their infrastructure or applications.

## Further reading

Learn more about Google's technical infrastructure security at [cloud.google.com/security/security-design](https://cloud.google.com/security/security-design).
