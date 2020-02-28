![Kubernetes logo](/images/k8s/kubernetes-icon-color.png)

---

## Container Orchestration

-   Provision and deploy containers onto nodes
-   Resource management/scheduling containers
-   Health monitoring
-   Scaling
-   Connect to networking
-   Internal load balancing

Note:

Container orchestration talks about managing the lifecycle of containers. It helps you with:

-   provisioning and deploying containers based on resources
-   doing health monitoring on containers
-   load balancing and service discovery
-   allocating resources
-   scale the containers up and down

---

## Kubernetes Overview

-   Most popular choice for cluster management and scheduling container-centric workloads
-   Open source project for running and managing containers
-   K8S = KuberneteS

Note:

Kubernetes is most popular choice for cluster management and container orchestration and you can use it to run your containers, do zero-downtime deployments and bunch of other stuff.
K8S = numeronym

---

### Definitions

Portable, extensible, open-source platform for managing containerized workloads and services

Container-orchestration system for automating application deployment, scaling, and management

---

## Kubernetes Architecture

![Kubernetes Architecture](/images/k8s/k8s-architecture.png)

Note:

A Kubernetes cluster is a set of physical or virtual machines and other infrastructure resources that are needed to run your application.

Each machine in a cluster is called a **node**. There are two types of nodes:

-   Master node: this node hosts the k8s control plane and manages the cluster
-   Worker node: runs your containerized applications

---

![Kubernetes Master Node](/images/k8s/k8s-master.png)

Note:

**API server**

One of the main components that runs on a Master node is called the API server. The API server is an endpoint that Kubernetes CLI uses for example to create the resources and to manage the cluster.

**Scheduler**

The scheduler component works together with the API server to schedule the applications to the worker nodes. It has the information about available resources on the nodes and the resources requested by applications. Using this information it decides on which worker node will your applications end up on.

**Controller manager**

Watches the state of the cluster and tries to reconcile the current state of the cluster with the desired state. It runs multiple controllers that are responsible for nodes, replication, endpoints, service accounts etc.

**etcd**

Etcd is a distributed key-value store and this is where the state of the cluster and API objects are stored in.

---

![Kubernetes Worker Node](/images/k8s/k8s-worker.png)

Note:

**Kubelet**

Service that runs on each node and manages the containers. It ensures containers are running and healthy and to connect to the control plane. It talks to the API server and only manages the resources on its node. When a new node comes up, kubelet introduces itself and provides the resources ("I have X CPU and Y memory") and asks if there are any containers that need to be run. Think of a kubelet as a node manager.

**CRI/Container runtime**

kubelet uses a container runtime interface (CRI) to talk to the container runtime that's responsbile for working with containers. In addition to Docker, Kubernetes also supports other container runtimes, such as containerd or cri-o

**Pods/Container**

The containers are running inside pods (the red rectangles) - pods are the smallest deployable units that can be created, schedule and managed on a Kubernetes cluster. It's a logical collection of containers that make up your app. Containers inside the same pod share the network and storage space and define how containers should be run.

**Proxy**

Each worker node also has a proxy that acks as a network proxy and a load balancer for services running on the work node. Client requests coming through external load balancerrs are redirected to containers running in pod through this proxy

---

## Kubernetes Resources

-   Multiple resources defined in the Kubernetes API

    -   namespaces
    -   pods
    -   services
    -   secrets
    -   ...

-   Custom resources as well!
    -   CRD (Custom Resource Definition)

Note:

The kubernetes APIs defines a lot of objects that are called resources
different properties and fields

Of course, you can define your own, custom resources as well

`kubectl api-resources` - lists all resources known by the api servers

---

![Kubernetes pod](/images/k8s/pod.png)

Note:

Pods are the most common resource in Kubernetes.

They are a collection of containers that share the namespace, network and volumes.

Any containers inside a pod get scaled together, as one unit.

Each pod also gets a unique IP address – containers within a pod can communication between each other by simply using localhost.

---

## Pods

-   Smallest deployable/manageable/scalable unit
-   Logic grouping of containers
    -   All running on the same node
    -   Share namespace, network, and volumes
-   Has a unique IP
-   Controlled by a ReplicaSet

Note:

Even though pods can be created directly, you will probably never do that.

Pods are designed to be disposable, so if you create an individual pod, you schedule it to run on a node in the cluster. If the pod crashes or gets deleted, it will be gone and it won't restart itself.

This is probably the opposite of what we want – if you have your service running in a pod, you'd want it to get restarted and rescheduled automatically if something bad happens.

To do that, you need to use a controller – this controller will manage the pods lifecycle and ensure that it gets rescheduled and restarted if something goes bad.

---

## Pods

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
  - name: myapp-container
    image: busybox
    command: ['sh', '-c', 'echo Hello World! && sleep 3600']
```

Note:

---

## ReplicaSet

-   Ensures specified number of pod replicas is running
    -   Creates and deletes pods as needed
-   Selector + Pod template + Replica count

Note:

The purpose of a replicaset is to maintain multiple copies of a pod. It's used to guarantee that a specified number of identical pods is running at all times.

The resource needs selector to know how to identify pods, a number of replicas - number of copies of pods it should be maintaining and a pod template that specifies the information about each pod.

The replicaset controller then uses the current state (let's say you don't have any pods running) and the desired state (let's say you want 5 replicas) and tries to create the pods to meet the desired state. Once the pods are created, it monitors them. For example, if you delete one pod, it will automatically re-create it.

---

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 5
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp-container
        image: busybox
        command: ['sh', '-c', 'echo Hello World! && sleep 3600']
```

Note:

line 8,9: replicas to define how many instances of the pod we want, and the match lables to tell replicaset how to find the pods

line 12: Pod template with labels and spec that has the containers

---

## Deployments

-   Describes desired state
-   Manages updates
    -   Controlled roll-out from actual state to the desired state

Note:

With replicaset we can ensure that we have a certain number of replicas running. Using a deployment, we can then manage replicasets and provide updates to pods for example.

The deployment is there to allow us do controlled updates. So if we want to change the image (use a different version etc.) we can use the deployment to do that.

If you only have a replicaset, we would need create a new replicaset with a new image version, then delete the old replicaset. All this functionality can be wrapped inside a deployment

---

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 5
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp-container
          image: busybox
          command: ['sh', '-c', 'echo Hello World! && sleep 3600']
```

Note:

Deployment is a resource used for describing how to create and update your application. Once you create a deployment, the pods will get schedule onto nodes in your cluster. If any of those pods crashes, the controller will automatically reschedule and restart the pod. Similarly if you change the number of pod replicas (or copies), it will make sure to scale the pods up or down accordingly.

Just like with other resources, each deployment has a name, set of labels as well as a template that describes the pods and containers.

---

![Deployment - 1](/images/k8s/deploy-1.png)

Note:

As mentioned earlier, Kubernetes Pods are mortal and once they die, they are gone and don not come back.

So we start with a deployment and deployment makes sure there is a single replica of our pod running. This pod also gets a unique IP address.

---

![Deployment - 2](/images/k8s/deploy-2.png)

Note:

If we try to make requests to that IP address, we can and everything works fine...

---

![Deployment - 3](/images/k8s/deploy-3.png)

Note:

until that pod dies.

---

![Deployment - 4](/images/k8s/deploy-4.png)

Note:

Since we are using a deployment, a new pod will be started and it will have unique IP again (not the same as the previous one, but different)

This is a problem. It is apparent that we cannot rely on pods IP address. This is where Kubernetes services come into play!

---

![Kubernetes Service](/images/k8s/k8s-service.png)

Note:

Service is an abstraction that defines a logical set of pods and give us a way to reliably reach the pods.

Service keeps a list of endpoints (pod IPs) and directs requests to them. These endpoints are kept up to date, so anytime a new pod starts or one crashes, the endpoints list gets updated.

---

## Services

-   Define a logical set of pods
    -   Pods are determined using labels (selector)
-   Reliable, fixed IP address
-   Automatic DNS entries
    -   E.g. `hello-web.default`

---

```yaml
kind: Service
apiVersion: v1
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      name: http
      targetPort: 3000
```

Note:

The logical set of pods or endpoints is defined by a label selector. In this example, we have a label selector on line 9 `app: myapp` and this means that any pod with that label will be included in the list of endpoints for this service.

Notice we are also defining a port – this is the port service can be accessed on as well as the port on the Pod. There's a key call `targetPort` (on line 13) which can be used to define different ports to reach on the pods.

Whenever a new service gets created, a DNS server inside the cluster creates a set of DNS records. For example, for the `myapp` service, the DNS entry called `myapp` and `myapp.default` get created.

First one can be used to access the service from within the same namespace, while the second one can be used to access a service from another namespace. A good practice is to always use the full name for the service.

---

## Services

- **ClusterIP**: Service is exposed on a cluster-internal IP (default)
- **NodePort**: Uses the same static port on each cluster node to expose the service
- **LoadBalancer**: Uses cloud providers' load balancer to expose the service
- **ExternalName**: Maps the service to a DNS name

Note:

For some pods you probably want to expose some services outside of your cluster. There are multiple different service types you can use:

ClusterIP : default type, service is exposed only internally, inside the cluster; it gets an internal IP

NodePort: exposes the service on the same static port on each cluster node. The service is then accessible from outside of the cluster using the public node IP address and the NodePort.

LoadBalancer: exposes the service through the cloud providers load balancer (assuming cloud provider supports it)

ExternalName: map the service name to an actual DNS name

How do you expose multiple services to the outside world then? Do you create multiple loadbalancers? That would be too costly and not efficient. Kubernetes has another resource that can help with this – the ingress resource!

---

## Ingress

-   Exposes HTTP/HTTPS routes from outside the cluster to services within the cluster
-   Ingress controller uses a load balancer to handle the traffic (based on the ingress rules)
-   Fanout and name based virtual hosting support:
    -   blog.example.com -> blog-service.default
    -   chat.example.com -> chat-service.default

Note:
The ingress resource helps with exposing routes from outside the cluster to the services running inside the cluster. The resource has a set of rules that decide where traffic gets routed to.

For example, you can use an ingress resource and controller to route anyone visting www.myhelloweb.com to a service running within your cluster. You can also define ingress rules to do a simple fanout -- using the same host, you can redirect traffic to different services within the cluster.

Finally, you can secure an ingress by specifying a Kubernetes secret that contains a TLS private key and certificate.

---

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress-example
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: blog.example.com
    http:
      paths:
      - path: /
        backend:
          serviceName: blog-service
          servicePort: 3000
      - path: /api
        backend:
          serviceName: blog-api
          servicePort: 8080
```

---

## Config Maps

-   Stores configuration values (key-value pairs)
-   Values consumed in pods as:
    -   environment variables
    -   files
-   Helps separating app code from configuration
-   Needs to exist before they are consumed by pods (unless marked as optional)
-   Need to be in the same namespace as pods

---

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: hello-kube-config
  namespace: default
data:
  count: 1
  hello: world
```

---

## Secrets

-   For storing and managing small amount of sensitive data (passwords, tokens, keys)
-   Referenced as files in a volume, mounted from a secret
-   Base64 encoded
-   Types: generic, Docker registry, TLS

---

## Namespaces

-   Provides unique scope for resources
    -   `my-namespace.my-service`
    -   `another-namespace.my-service`
-   (Most) Kubernetes resources live inside a namespace
-   Can't be nested

Note:

You can use Kubernetes namespaces to divide the cluster between multiple users and organize and logically group resources together.

For example: I could create multiple namespaces for different users or per projects or for different portions of a project and so on. If doing that you should also make sure to set the resource quotas and security policies – you probably don't want one user or project to take up all the resources or have access to resources running in other namespaces.

Initially, there are three namespaces that get created. Kube-system namespace for system resources, you usually don't deploy anything into this namespaces. Similarly with the kube-public namespace – it's used for cluster usage and in case you want to make resource visible and readable publicly. The namespace we will be using is called 'default'.

Any resource you create gets created in the default namespace (assuming you didn't explicitly provide a namespace). Namespaces also provide you a unique scope where you can deploy your resources in. Resources inside the namespace need to be unique, but they don't have to be unique across namespaces; you can have a resource called "my-service" in multiple namespaces, however you can't have two resources with the same name in one namespace.
