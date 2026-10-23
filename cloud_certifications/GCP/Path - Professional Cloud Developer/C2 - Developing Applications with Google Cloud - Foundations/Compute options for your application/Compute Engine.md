
# Compute Engine


---


## 1. Core Concept

- **Definition:** Compute Engine is Google Cloud's `most flexible option` for running applications, but it requires the `most operational effort` to manage
- you create `high-performance virtual machines` and then install and run your applications on them
- think of Compute Engine as the closest GCP equivalent to `running your own servers` — full control, full responsibility
- **When to use Compute Engine:**
	- you want `full control of your infrastructure`
	- you have specialized applications with unique compute or OS requirements
	- you need to install and run `third-party licensed software`
	- you need TCP network protocols `other than HTTP or HTTPS`
	- you're doing a `lift-and-shift migration` — move VMs from on-premises or another cloud provider to Google Cloud without changing your application


---


## 2. Machine Types and Hardware

- **predefined machine types:** popular configurations available out of the box
- **custom machine types:** customize `CPU and memory` for your VMs when predefined types don't match your needs

### Storage

- create and attach `persistent disks` and `local SSDs`
- accessed like physical disks in a desktop or server
- unlike physical disks, Compute Engine disks can be `increased in size while they are running`
- `performance and throughput` of persistent disks increase when they increase in size

### Accelerators

- attach `GPUs` (graphics processing units) and `TPUs` (Tensor Processing Units) to VMs
- used to accelerate `parallel processing` and `machine learning workloads`

### Operating Systems

- run your choice of OS: `Debian, Ubuntu, Red Hat Enterprise Linux, Rocky Linux`, various other Linux flavors, or `Windows`
- use a shared image from the `Google Cloud community` or bring your own operating system

### Preemptible VMs

- ideal for `large compute and batch jobs`
- if capacity must be reclaimed, Google Cloud can `terminate preemptible VMs`
- available at a discount of `at least 60%` compared to standard VMs
- only suitable for applications that can `handle interruptions`


---


## 3. Managed Instance Groups and Autoscaling

- create `managed instance groups` of VMs based on an `instance template`
- configure `global load balancing` and `autoscaling` of the managed instance groups
- Compute Engine performs `health checks` and replaces unhealthy instances in an instance group
- can `autoscale the number of instances` based on traffic volume in specific regions

- `NOTE:` you can install and patch software that runs on a VM — this is your responsibility, unlike with Cloud Run where the platform manages the runtime


---


## 4. Tips & Tricks

- for the PCD exam, the key signal for choosing Compute Engine is when the question mentions `lift-and-shift`, `custom OS requirements`, `third-party licensed software`, or `non-HTTP protocols`
- preemptible VMs are a common exam topic — remember they can be terminated at any time with `at most 60% discount`, so they're only appropriate for `fault-tolerant, interruptible workloads` (batch processing, data pipelines, rendering)
