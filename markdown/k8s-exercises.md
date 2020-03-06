## Kubernetes CLI Exercises 

---

## Basic Commands

![Basic kubectl commands](/images/k8s/kubectl-basic-cmds.png)

---

### Short resource names

 - Use `n` instead `namespace`
 - Use `deploy` instead `deployment`
 - Use `po` instead `pods`
 - Use `svc` instead `service` 

---

### Listing Resources 

1. List all Mushop pods in the default namespace: 

```bash
$ kubectl get pods
NAME                                 READY   STATUS             RESTARTS   AGE
mushop-api-6df5948d68-pjr9s          1/1     Running            0          9m35s
mushop-assets-dd5756599-drp9l        1/1     Running            0          9m35s
mushop-assets-deploy-1-vnhsx         1/1     Running            0          9m35s
mushop-carts-6877fbb7b9-24jlq        1/1     Running            0          9m34s
mushop-catalogue-5cb888bd44-h8q4r    1/1     Running            0          9m35s
mushop-edge-648c989cd4-vk6gf         1/1     Running            0          9m35s
...
```
>Use `kubectl get pods -A` to show pods from all namespaces

---

### Describing resources 

1. Get information about the `mushop-api` deployment:

```bash
kubectl describe deploy mushop-api
```

> Works for other resources as well:
  ```bash
  $ kubectl describe pod [pod-name]
  $ kubectl describe svc [service-name]
  ```

---

### Getting logs 

```bash
# Shows the logs from the specific pod
$ kubectl logs [pod-name]

# Shows the log from a specific container within a pod
$ kubectl logs [pod-name] -c [container-name]

# Follow the logs from a pod
$ kubectl logs [pod-name] -f
```

Get the logs from the `mushop-api` pod:

```bash
$ kubectl logs mushop-api-6df5948d68-dkwxp
MOCK mode: CARTS
MOCK mode: CATALOGUE
MOCK mode: ORDERS
MOCK mode: USERS
Using the redis based session manager
App now running in production mode on port 3000
::ffff:10.244.3.37 - - [05/Mar/2020:18:18:39 +0000
...
```

---

### Following logs

1. Open two terminal windows
2. Start the port-forward command:

```bash
kubectl port-forward svc/edge 8000:80
```

3. Get the API pod name (hint: `kubectl get pods`)
4. Follow the logs from the API pod (add `-f` to the command):

```bash
kubectl logs mushop-api-6df5948d68-dkwxp -f
```

5. Open `http://localhost:8000` and observe the logs

---

## CRUD Commands

![CRUD commands](/images/k8s/kubectl-crud-cmds.png)

---

### Namespaces

1. Create a new namespace:

```bash
kubectl create ns my-namespace
```

2. Show all namespaces:

```bash
$ kubectl get ns
NAME              STATUS   AGE
default           Active   56d
kube-public       Active   56d
kube-system       Active   56d
my-namespace      Active   12s
```

3. Delete the namespace:

```bash
kubectl delete ns my-namespace
```

---

### Deployments

1. Create a new deployment:

```bash
kubectl create deploy httpbin --image kennethreitz/httpbin
```
2. Edit the deployment:

```bash
kubectl edit deploy httpbin
```
4. Change the line `replicas: 1` to `replicas: 3`. Save and close the editor.
5. Check the number of pods running:

```bash
kubectl get pods
```
6. Delete the deployment:

```bash
kubectl delete deploy httpbin
```

---

### Scaling (1/2)

1. Scale the pods in API deployment:

```bash
$ kubectl scale deploy mushop-api --replicas=3
deployment.extensions/mushop-api scaled
```
2. List the pods labeled with `app=api`:

```bash
$ kubectl get pods -l app=api
NAME                          READY   STATUS    RESTARTS   AGE
mushop-api-6df5948d68-4lxmg   1/1     Running   0          4m55s
mushop-api-6df5948d68-bn5l7   1/1     Running   0          4m55s
mushop-api-6df5948d68-dkwxp   1/1     Running   0          27m
```

---

### Scaling (2/2)

1. Delete one of the pods

```bash
$ kubectl delete pod mushop-api-6df5948d68-4lxmg
pod "mushop-api-6df5948d68-4lxmg" deleted
```

>If you list the pods again you will notice the deleted pod gets automatically re-created.

2. Scale the deployment back to 1

```bash
$ kubectl scale deploy mushop-api --replicas=1
```

---

### Using a YAML file (1/2)

1. Add the following to `k8s.yaml` file:

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
  namespace: default
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

### Using a YAML file (2/2)

1. Create the resources using `k8s.yaml` file:

```bash
kubectl create -f k8s.yaml
```

2. List the deployments:

```bash
kubectl get deploy
```

3. Delete the created deployment:

```bash
kubectl delete -f k8s.yaml
```