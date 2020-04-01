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
    -   deployments
    -   ...

-   Custom resources as well!
    -   CRD (Custom Resource Definition)

Note:

The kubernetes APIs defines a lot of objects that are called resources
different properties and fields

Of course, you can define your own, custom resources as well

`kubectl api-resources` - lists all resources known by the api servers

---

![Kubernetes resources](/images/k8s/k8s-deployment.png)

Note:
An architectural view of the most common resources in Kubernetes. 

Explain how containers relate to pods, replicasets, and services, namespaces

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

---

## Demo - Cloud Shell Setup

Note:

Show how to set up Cloud shell - get the kubeconfig, set the context

1. Verify CLI si configured correcty: 
```
oci os ns get
```

2. Go to OKE cluster detail page to get the Kubeconfig

3. Run the oci ce cluster create-kubeconfig command

4. Create a namespace

```
kubectl create namespace <your_name>
```

5. Set the default namespace for your context:

```
kubectl config set-context \
  --current --namespace=<your_name>
```

---

## Exercises (1/2)

1. Open [Cloud Shell](https://docs.cloud.oracle.com/en-us/iaas/Content/API/Concepts/cloudshellgettingstarted.htm)

2. Verify CLI is configured correctly:

```
oci os ns get
```

3. From the OKE Cluster detail page, click Access Kubeconfig. Copy the command that resembles the following:

```
oci ce cluster create-kubeconfig \
  --cluster-id ocid1.cluster.oc1.iad.aaaaaaaaabbbbbbbbdddddddd...xxx \
  --file $HOME/.kube/config --region us-ashburn-1 --token-version 2.0.0
```

4. Check `kubectl` context:

```
kubectl config current-context
# cluster-c4daylfgvrg
```

---

## Exercises (2/2)

1. Create a namespace

```
kubectl create namespace <your_name>
```

2. Set the default namespace for your context:

```
kubectl config set-context \
  --current --namespace=<your_name>
```

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
  name: helloworld
  labels:
    app: helloworld
spec:
  containers:
  - name: helloworld
    image: busybox
    command: ['sh', '-c', 'echo Hello World! && sleep 3600']
```

Note:

---

## Basic Commands

![Basic kubectl commands](/images/k8s/kubectl-basic-cmds.png)

---

## Demo - kubectl and pods

Note:

1. Show nodes in the cluster: 

```
kubectl get nodes
```

2. Create a pod 

```
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: helloworld
  labels:
    app: helloworld
spec:
  containers:
  - name: helloworld
    image: busybox
    command: ['sh', '-c', 'echo Hello World! && sleep 3600']
EOF
```

3. Show the pod: 
```
kubectl get pods
```

4.. Show the logs from the pod: 

```
kubectl logs helloworld
```

5. Delete the pod: 
```
kubectl delete po helloworld
```

Explain why pod doesn't come back automatically.

---

## Exercises (1/3)

1. List all pods in your namespace

```bash
kubectl get pods
```

1. List all pods in the cluster

```bash
kubectl get pods --all-namespaces
```

---

## Exercises (2/3)

1. Create a file called [`pod.yaml`](/public/k8s/pod.yaml):

```bash
apiVersion: v1
kind: Pod
metadata:
  name: helloworld
  labels:
    app: helloworld
spec:
  containers:
  - name: helloworld
    image: busybox
    command: ['sh', '-c', 'echo Hello World! && sleep 3600']
```

2. Create the pod:

```bash
kubectl create -f pod.yaml
```

3. Show the pod:

```bash
kubectl get pods
```

---

## Exercises (3/3)

1. Check the logs from the pod

```bash
kubectl logs [podname]
```

2. Delete the pod

```bash
kubectl delete pod [podname]
```

---

## Knowledge check

Will Kubernetes automatically restart a pod when it gets deleted?

Note:

Use the Yes/No buttons in Zoom to answer. 

Because Kubernetes does not automatically restart a pod, a different resource is needed to do that. You should never create individual pods 

(note: There is a concept of Static Pods that *are* automatically restarted by k8s)

---

![Kubernetes resources](/images/k8s/k8s-deployment.png)

Note:
Show this same diagram again, and explain the correlation between pods and a replicaset.

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
  name: helloworld
  labels:
    app: helloworld
spec:
  replicas: 1
  selector:
    matchLabels:
      app: helloworld
  template:
    metadata:
      labels:
        app: helloworld
    spec:
      containers:
      - name: helloworld
        image: busybox
        command: ['sh', '-c', 'echo Hello World! && sleep 3600']
```

Note:

line 8,9: replicas to define how many instances of the pod we want, and the match lables to tell replicaset how to find the pods

line 12: Pod template with labels and spec that has the containers

also note how we aren't provided the pod name directly. This is because replicaset is in charge of creating (and subsequently) naming the pods.

---

## Demo - ReplicaSet

Note:

1. Create a [`rs.yaml`](/public/k8s/rs.yaml) file:

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: helloworld
  labels:
    app: helloworld
spec:
  replicas: 1
  selector:
    matchLabels:
      app: helloworld
  template:
    metadata:
      labels:
        app: helloworld
    spec:
      containers:
      - name: helloworld
        image: busybox
        command: ['sh', '-c', 'echo Hello World! && sleep 3600']
```

2. Deploy the file 

3. Show the created ReplicaSet:
```
kubectl get replicaset
```

4. Show the created pod (look at the pod name)
```
kubectl get pods
```

5. Show the logs from the pod: 

```
kubectl logs helloworld
```

6. Delete the pod: 
```
kubectl delete po helloworld
```

Show how the pod gets restarted automatically.

7. Scale the pod:

```
kubectl scale rs --replicas=3
```

8. Delete the replica set:

```
kubectl delete rs helloworld
```

---

## Exercises (1/4)

1. Create a [`rs.yaml`](/public/k8s/rs.yaml) file:

```bash
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: helloworld
  labels:
    app: helloworld
spec:
  replicas: 1
  selector:
    matchLabels:
      app: helloworld
  template:
    metadata:
      labels:
        app: helloworld
    spec:
      containers:
      - name: helloworld
        image: busybox
        command: ['sh', '-c', 'echo Hello World! && sleep 3600']
```

---

## Exercises (2/4)

1. Create the ReplicaSet using `kubectl create` command

2. List all pods in your namespace using `get pods` command

3. Scale the pods in your replica set to 3 instances:

```
kubectl scale rs [replicaset-name] --replicas=3
```

---

## Exercises (3/3)

1. Delete one of the pods 

Tip: run `get pods` first to get the pod name

2. Scale the replica set back down to 1 instance:

```
kubectl scale rs [replicaset-name] --replicas=1
```

3. Delete the replica set using `kubectl delete rs` command

---

## Knowledge check

Do you have to provide a pod name when using a replica set?

Note:

Use the Yes/No buttons in Zoom to answer. 

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

![Kubernetes resources](/images/k8s/k8s-deployment.png)

Note:
Show this same diagram again, and explain the correlation between pods, replicaset, and deployments.

---

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: helloworld
  labels:
    app: helloworld
spec:
  replicas: 1
  selector:
    matchLabels:
      app: helloworld
  template:
    metadata:
      labels:
        app: helloworld
    spec:
      containers:
        - name: helloworld
          image: busybox
          command: ['sh', '-c', 'echo Hello World! && sleep 3600']
```

Note:

Deployment is a resource used for describing how to create and update your application. Once you create a deployment, the pods will get schedule onto nodes in your cluster. If any of those pods crashes, the controller will automatically reschedule and restart the pod. Similarly if you change the number of pod replicas (or copies), it will make sure to scale the pods up or down accordingly.

Just like with other resources, each deployment has a name, set of labels as  well as a template that describes the pods and containers.

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

## Demo - Deployments

Note:

1. Add the following to `deploy.yaml` file:

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
  labels:
    app: httpbin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: httpbin
  template:
    metadata:
      labels:
        app: httpbin
    spec:
      containers:
      - image: kennethreitz/httpbin
        imagePullPolicy: Always
        name: httpbin
```

1. Create the resources using `k8s.yaml` file:

```bash
kubectl create -f k8s.yaml
```

2. List the deployments:

```bash
kubectl get deploy
```

3. Scale the deployment:

```bash
kubectl scale deploy httpbin --replicas=3
```

4. Delete the created deployment:

```bash
kubectl delete -f k8s.yaml
```

---

## Exercises (1/2)

1. Add the following to [`deploy.yaml`](/public/k8s/deploy.yaml) file:

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
  labels:
    app: httpbin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: httpbin
  template:
    metadata:
      labels:
        app: httpbin
    spec:
      containers:
      - image: kennethreitz/httpbin
        imagePullPolicy: Always
        name: httpbin
```

---

## Exercises (2/2)

1. Create the resources using `deploy.yaml` file:

```bash
kubectl create -f deploy.yaml
```

2. List the deployments:

```bash
kubectl get deploy
```

3. Scale the deployment:

```bash
kubectl scale deploy httpbin --replicas=3
```

4. Look at the ReplicaSet (notice how it's named):

```bash
kubectl get rs 
```

5. Delete the created deployment:

```bash
kubectl delete -f deploy.yaml
```

---

![Kubernetes resources](/images/k8s/k8s-deployment.png)

Note:
Show this same diagram again, and explain the correlation between pods, replicaset, deployments and services.

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
  name: helloworld
  labels:
    app: helloworld
spec:
  selector:
    app: helloworld
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

## Demo - Services

Note:

1. Add the following to `deploy.yaml` file:

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
  labels:
    app: httpbin
spec:
  replicas: 5
  selector:
    matchLabels:
      app: httpbin
  template:
    metadata:
      labels:
        app: httpbin
    spec:
      containers:
      - image: kennethreitz/httpbin
        imagePullPolicy: Always
        name: httpbin
```

2. Create the resources using `deploy.yaml` file:

```bash
kubectl create -f deploy.yaml
```

3. List the pods:

```bash
kubectl get pods
```

4. Show the pod IP addresses

```bash
kubectl get pods -o wide
```

5. Create a Service

```bash
cat <<EOF | kubectl apply -f -
kind: Service
apiVersion: v1
metadata:
  name: helloworld
  labels:
    app: helloworld
spec:
  selector:
    app: helloworld
  ports:
    - port: 80
      name: http
      targetPort: 3000
EOF
```

6. Describe the service and show the endpoint list

```
kubectl describe svc helloworld
```

--- 

## Exercises (1/3)

1. Add the following to `deploy.yaml` file:

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
  labels:
    app: httpbin
spec:
  replicas: 2
  selector:
    matchLabels:
      app: httpbin
  template:
    metadata:
      labels:
        app: httpbin
    spec:
      containers:
      - image: kennethreitz/httpbin
        imagePullPolicy: Always
        name: httpbin
```

2. Create the resources using `deploy.yaml` file:

```bash
kubectl create -f deploy.yaml
```

---

## Exercises (1/2)

1. List the pods:

```bash
kubectl get pods
```

2. Show the pod IP addresses

```bash
kubectl get pods -o wide
```

---

## Exercises (2/2)

1. Create a Service [`svc.yaml`](/public/k8s/svc.yaml):

```bash
kind: Service
apiVersion: v1
metadata:
  name: helloworld
  labels:
    app: helloworld
spec:
  selector:
    app: helloworld
  ports:
    - port: 80
      name: http
      targetPort: 3000
```

2. Create the service using `kubectl create`

3. Describe the service and look at the endpoint list

```
kubectl describe svc helloworld
```

---

![Ingress 1](/images/k8s/ingress-1.png)

Note:

Let's consider the scenario where we have 4 Kubernetes services inside one cluster. Each service has one or more pods. 

To access these services internally - for example access Service 2 from Service 1, you can either use the service name or the service IP. 

However, that doesn't work if you would want to access any of those service from outside of the cluster - from an external IP or a domain name.

---

![Ingress 2](/images/k8s/ingress-2.png)

Note:

To expose a Kubernetes service outside of the cluster you can set the service type to LoadBalancer. That triggers the creation of an actual load balancer instance in the cloud provider - this is done automatically whenever you create a service with LoadBalancer type. This also means you get a public IP address.

Once the load balancer is created you can use the IP address and you'll be able to access Service 1 in our case.

Let's say you want to expose another service to the public - how would you do that?

---

![Ingress 3](/images/k8s/ingress-3.png)

Note:

You can set the type on that service to LoadBalancer and another load balancer instance will get provisioned for you.

Now this solution is ok, however in most cases you probably don't want to have an instance of load balancer for every service you want to expose.

It is more practical to have a single load balancer and then configure it in such a way that you can access different service within your cluster.

---

![Ingress 4](/images/k8s/ingress-4.png)

Note:

The way to do that is to deploy an ingress controller. In our case that is a Kubernetes service with pod that's running an Nginx container.

This ingress controller service and deployment is not in any way different from any other service and deployments you have running in the cluster.

---

![Ingress 5](/images/k8s/ingress-5.png)

Note:

Again, if we set the service type to load balancer, an instance gets provisioned.

Now if we would access the external IP address we will get back a response from the ingress controller pods.

So how can we access Service 1 or Service 3 for example through the same IP address?

---

![Ingress 6](/images/k8s/ingress-6.png)

Note:

This is where a Kubernetes resource callex Ingress comes in.

With the ingress resources we can write rules that route traffic to any service running inside Kubernetes.

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

## Demo - Ingress

Note:

1. Deploy the Nginx controller:

```
helm install nginx-ingress stable/nginx-ingress
```

2. Show the ingress controller and default backend pods:

```
kubectl get pods
```

3. Show the ingress controller service and external IP

```
kubectl get svc
```

4. Access the external IP:

```
curl [ip]
```
This shows the response from the default backend 

Create an entry in the /etc/hosts file from the extenral ip to [name].example.com

5. Create a deployment and service

```
kubectl run httpbin-1 --image=kennethreitz/httpbin

kubectl expose deployment httpbin-1 --port=3000 --target-port=80
```

6. Show the service to make sure it's ClusterIP:

```
kubectl get svc 
```

7. Create the ingress resource:

```
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress-example
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: peterj.example.com
    http:
      paths:
      - path: /hello
        backend:
          serviceName: httpbin-1
          servicePort: 3000
EOF
```

8. Access the host name (peterj.example.com) and show the response.

9. Let's say we want to expose another service through a different DNS name - hello.example.com. Create an nginx deployment and service: 

```
kubectl run nginx-1 --image=nginx --port=80

kubectl expose deployment nginx-1 --port=8080 --target-port=80
```

10. Let's add the hello.example.com to the hosts file as well.

11. If you try to acess hello.example.com - you will get back the respons from the default backend. Let's update the ingress:

```
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress-example
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: peterj.example.com
    http:
      paths:
      - path: /
        backend:
          serviceName: httpbin-1
          servicePort: 3000
  - host: hello.example.com
    http:
      paths:
      - path: /
        backend:
          serviceName: nginx-1
          servicePort: 8080
EOF
```

12. If you access the hello.example.com now, you will see the response from the Nginx pods.

---

## Exercises - Ingress

Note:

Pick someone from the group to install the Nginx controller - that person should share their screen so every follows along. Explain again why only one person needs to install this (i.e. so we only have a single load balancer)

---

## Exercises - Ingress Controller

Only one person needs to run the following command:

```
helm install nginx-ingress stable/nginx-ingress
```

Note:

After ingress controller is installed, everyone can do the exercises on their own.

---

## Exercises - Ingress (1/3)

1. Get the external IP address of the ingress controller service

```
kubectl get svc 
```

2. Open `/etc/hosts` and add the following entry:

```
[EXTERNAL-IP] [yourname].example.com
```
This is the URL you will use to access the pods you will deploy.

3. Create a deployment and a service:

```
kubectl run httpbin --image=kennethreitz/httpbin
kubectl expose deployment httpbin --port=3000 --target-port=80
```

---

## Exercises - Ingress (2/3)

1. Create an ingress resource [`ingress.yaml`](/public/k8s/ingress.yaml) and replace `[yourname]` value.
```
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress-example
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: [yourname].example.com
    http:
      paths:
      - path: /
        backend:
          serviceName: httpbin
          servicePort: 3000
```

2. Try accessing the deployed pods from `[yourname].example.com`

---

## Exercises - Ingress (3/3)

1. Update the ingress resource and make the pods available through `[yourname].example.com/hello`

2. Create another deployment and sertvice (use the Nginx image) and expose it through `[yourname].example.com/nginx`

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

## Creating Secrets

Create a secret with some keys.

```
kubectl create secret generic mysecret --from-literal=username=administrator --from-literal=password=topsecret
```

This example creates a secret using the `create` command and specifies literal values.

---

## Secrets (contd.)

Use the command below to list your secrets. 

How would you get more details for a specific secret ?

```
kubectl get secrets
```

---

## Secrets (contd.)

You can create secrets from 
- Literals
- Files
- Entire directories. 

Since a kubernetes secret is a kubernetes object,
it can be represented in a manifest and applied like other objects. 

Use the command below to explore the syntax more.

```
kubectl create secret generic --help
```

---

## Working with Secrets

To use a secret, a Pod needs to reference the secret. 
Lets create a pod manifest that does this.

```
cat << EOF >pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
  - name: mypod
    image: nginx
    ports:
    - containerPort: 80
    env:
      - name: SECRET_USERNAME
        valueFrom:
          secretKeyRef:
            name: mysecret
            key: username
    volumeMounts:
    - name: foo
      mountPath: "/etc/foo"
      readOnly: true
  volumes:
  - name: foo
    secret:
      secretName: mysecret
      items:
      - key: username
      - key: password
        path: my-password/secret-password
EOF
```

Note:

- The secret is referenced as an environment variable `SECRET_USERNAME`.
- The secret contains two keys, but only one is exposed though the environment.
- The secret is also mounted as a volume.
- The secrets are available as files in the mounted volume.
- Individual keys from the secret can be exposed, their paths re-mapped (under the mountPath) and specific file permission can be set.

---

## Working with Secrets

To see the secrets are made available to a pod, deploy the pod.
```
kubectl apply -f pod.yaml
```

Now we can exec in to the container by starting a shell. 
```
kubectl exec -t -i mypod bash
```

---

## Working with Secrets


Inside the container, we can examine the secrets that were provided as environment variables as well as volumes.

```
echo $SECRET_USERNAME
cat /etc/foo/username
```
Where is the password available ?
