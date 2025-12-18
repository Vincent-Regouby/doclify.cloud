# Product Requirements Document (PRD)
## Application de Transcription et CRM Médical SaaS

**Version 3.1 - Document Consolidé avec Optimisations**  
**Date : Janvier 2025**  
**Classification : Confidentiel**

> **Révision 3.1** : Intégration d'Odoo Community (gratuit) et GPU cloud (RunPod/Vast.ai) pour une réduction de coûts de 65% tout en maintenant les performances.
> 
> Ce document intègre les meilleures pratiques et distingue explicitement les aspects **Fonctionnels (F)** et **Techniques (T)**.

---

## Table des matières
1. [Vue d'ensemble](#1-vue-densemble)
2. [Périmètre fonctionnel](#2-périmètre-fonctionnel-f)
3. [Acteurs et rôles](#3-acteurs-et-rôles-f)
4. [Architecture technique](#4-architecture-technique-t)
5. [Infrastructure et déploiement](#5-infrastructure-et-déploiement-t)
6. [Application mobile Flutter](#6-application-mobile-flutter)
7. [API Gateway FastAPI](#7-api-gateway-fastapi-t)
8. [Stockage MinIO](#8-stockage-minio-t)
9. [Pipeline de traitement](#9-pipeline-de-traitement-t)
10. [Module Odoo 19](#10-module-odoo-19)
11. [Sécurité et RGPD](#11-sécurité-et-rgpd)
12. [Tests et qualité](#12-tests-et-qualité)
13. [Phases de développement](#13-phases-de-développement)
14. [Estimations et KPIs](#14-estimations-et-kpis)

---

## 1. Vue d'ensemble

### 1.1 Mission (F)
Développer une plateforme SaaS permettant aux médecins d'enregistrer leurs consultations vocales via smartphone, avec transcription et résumé automatiques par IA locale, stockage sécurisé dans un CRM médical accessible via interface web.

### 1.2 Objectifs business (F)
| Objectif | Cible | Métrique de succès |
|----------|-------|-------------------|
| **Adoption initiale** | 10 médecins | 8/10 actifs quotidiennement |
| **Scalabilité** | 100+ médecins | Architecture élastique |
| **Conformité** | RGPD 100% | Audit trimestriel validé |
| **ROI médecin** | +2h/semaine | vs dictée manuelle |
| **Satisfaction** | NPS > 50 | Enquête trimestrielle |

### 1.3 Contraintes critiques (T)
- **Hébergement** : On-premise sur vos serveurs
- **IA** : 100% locale, aucune API cloud externe
- **Audio** : Jamais stocké définitivement, suppression post-traitement
- **Données** : Isolation stricte par médecin
- **Langue** : Français prioritaire, multi-langue en phase 2

---

## 2. Périmètre fonctionnel (F)

### 2.1 Inclus dans le MVP
✅ Enregistrement audio longue durée (jusqu'à 1h30)  
✅ Upload sécurisé et résilient via S3 Multipart  
✅ Transcription automatique (Whisper local)  
✅ Résumé conversationnel neutre (Ollama/Llama3)  
✅ Stockage structuré dans Odoo 19 multi-tenant  
✅ Interface web consultation/édition/recherche  
✅ Gestion offline et synchronisation automatique  
✅ Export PDF/CSV des consultations  

### 2.2 Exclu du MVP
❌ Diagnostic médical ou suggestions thérapeutiques  
❌ Gestion agenda, facturation ou comptabilité  
❌ Partage entre médecins ou téléexpertise  
❌ Application patient  
❌ Intégration avec systèmes tiers (DMP, Ameli)  

### 2.3 Évolutions futures
- Module patient complet avec consentement numérique
- Tableau de bord analytique et statistiques
- API publique pour intégrations tierces
- Support multi-langue automatique
- Application desktop native
- Migration vers Odoo Enterprise si besoins comptabilité/signature
- GPU on-premise si volume > 200 médecins

---

## 3. Acteurs et rôles (F)

| Acteur | Responsabilités | Accès données | Authentification |
|--------|-----------------|---------------|------------------|
| **Médecin** | • Enregistre consultations<br>• Consulte/édite transcriptions<br>• Recherche historique | Ses consultations uniquement | OIDC/JWT + 2FA optionnel |
| **Admin SaaS** | • Gestion médecins<br>• Monitoring plateforme<br>• Support technique | Vue globale anonymisée | Admin Odoo + VPN |
| **Service technique** | • Maintenance<br>• Déploiements<br>• Monitoring | Logs et métriques | SSH + certificats |
| **Workers IA** | • Transcription<br>• Résumé<br>• Nettoyage | Via API uniquement | Service account |

---

## 4. Architecture technique (T)

### 4.1 Vue d'ensemble
```
┌──────────────────┐
│  Flutter Mobile  │
│  iOS / Android   │
└────────┬─────────┘
         │ HTTPS + S3 Multipart
         ▼
┌──────────────────┐     ┌──────────────────┐
│   API Gateway    │────▶│      MinIO       │
│    (FastAPI)     │     │  (S3 Storage)    │
└────────┬─────────┘     └────────┬─────────┘
         │                         │ Events
         ▼                         ▼
┌──────────────────┐     ┌──────────────────┐
│    RabbitMQ      │◀────│   Workers IA     │
│  (Message Queue) │────▶│ (Whisper+Ollama) │
└──────────────────┘     └────────┬─────────┘
                                   │
         ┌─────────────────────────┘
         ▼
┌──────────────────┐     ┌──────────────────┐
│    Odoo 19       │────▶│   PostgreSQL     │
│  (CRM + Web UI)  │     │    + Redis       │
└──────────────────┘     └──────────────────┘
```

### 4.2 Stack technique consolidée

| Couche | Technologies | Justification |
|--------|-------------|---------------|
| **Mobile** | Flutter 3.16+, Dart | Cross-platform, performances natives |
| **API** | FastAPI, Python 3.11+, Pydantic | Async, validation robuste, OpenAPI |
| **Queue** | RabbitMQ 3.13+ | Fiabilité, DLQ, routing flexible |
| **Stockage** | MinIO (S3-compatible) | On-premise, multipart natif, events |
| **Transcription** | Faster-Whisper, CUDA optionnel | Performance, précision FR |
| **LLM** | Ollama + Llama 3.1 8B | Local, français, résumés neutres |
| **CRM** | Odoo 19 Community | Multi-tenant, extensible, interface web, gratuit |
| **Database** | PostgreSQL 15 + Redis 7 | ACID, cache, sessions |
| **Monitoring** | Prometheus + Grafana + Loki | Métriques, logs, alertes |
| **Déploiement** | Docker Compose + Coolify | Simplicité, GitOps |

---

## 5. Infrastructure et déploiement (T)

### 5.1 Architecture serveurs - Phase MVP (10 médecins)

#### **Configuration 2 serveurs + GPU Cloud (Recommandé MVP)**
```yaml
Serveur 1 - "Application" (8 cores, 32GB RAM, 500GB SSD)
├── FastAPI (API Gateway)
├── Odoo 19 Community (CRM + Web)
├── PostgreSQL 15
├── Redis 7
└── Nginx (Reverse Proxy + SSL)

Serveur 2 - "Processing" (12 cores, 32GB RAM, 1TB SSD, sans GPU)
├── MinIO (S3 Storage)
├── RabbitMQ (Message Queue)
├── Worker Whisper CPU (traitement normal)
├── Worker Ollama CPU
├── GPU Dispatcher (RunPod/Vast.ai)
└── Monitoring Stack

GPU Cloud (RunPod/Vast.ai) - À la demande
├── RTX 4090/3090 (0.20-0.74€/heure)
├── Whisper Large v3 (traitement prioritaire)
└── Auto-scaling selon charge
```

### 5.2 Architecture serveurs - Phase Scale (100+ médecins)

#### **Configuration 5 serveurs**
```yaml
Serveur 1 - "Gateway" (4 cores, 16GB RAM, 200GB SSD)
├── FastAPI Cluster (3 instances)
├── Nginx + HAProxy
└── Redis Sessions

Serveur 2 - "Application" (8 cores, 32GB RAM, 500GB SSD)
├── Odoo 19 Multi-Worker
└── Interface Web

Serveur 3 - "Database" (8 cores, 64GB RAM, 1TB SSD NVMe)
├── PostgreSQL Primary
├── Redis Cache
└── Backup Manager

Serveur 4 - "Storage" (8 cores, 32GB RAM, 4TB SSD)
├── MinIO Cluster
├── RabbitMQ Cluster
└── Event Router

Serveur 5+ - "Workers" (16 cores, 64GB RAM, GPU RTX 4070)
├── Worker Pool Whisper (auto-scaling)
├── Worker Pool Ollama
└── Queue Consumers
```

### 5.3 Configuration Docker Compose
```yaml
version: '3.8'

services:
  # API Gateway avec health checks
  api-gateway:
    image: medical-api:latest
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
    environment:
      - DATABASE_URL=postgresql://medical:${DB_PASSWORD}@postgres:5432/medical
      - RABBITMQ_URL=amqp://medical:${RABBITMQ_PASSWORD}@rabbitmq:5672
      - MINIO_ENDPOINT=minio:9000
      - REDIS_URL=redis://redis:6379/0
      - JWT_SECRET=${JWT_SECRET}
      - RUNPOD_API_KEY=${RUNPOD_API_KEY}
      - VAST_AI_API_KEY=${VAST_AI_API_KEY}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # MinIO avec configuration optimisée
  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      - MINIO_ROOT_USER=admin
      - MINIO_ROOT_PASSWORD=${MINIO_PASSWORD}
      - MINIO_STORAGE_CLASS_STANDARD=EC:2
      - MINIO_BROWSER_REDIRECT_URL=https://minio.medical.local
    volumes:
      - minio-data:/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]

  # Workers IA hybrides (CPU local + GPU cloud)
  ai-workers:
    image: medical-workers:latest
    deploy:
      replicas: 2
    volumes:
      - models:/app/models
      - temp-audio:/tmp/audio
    environment:
      - RABBITMQ_URL=amqp://medical:${RABBITMQ_PASSWORD}@rabbitmq:5672
      - MINIO_ENDPOINT=http://minio:9000
      - ODOO_URL=http://odoo:8069
      - WHISPER_MODEL=medium  # Model CPU plus léger
      - OLLAMA_MODEL=llama3.1:8b
      - RUNPOD_API_KEY=${RUNPOD_API_KEY}
      - VAST_AI_API_KEY=${VAST_AI_API_KEY}
      - GPU_PROVIDER=runpod  # ou vast_ai
      - ENABLE_GPU_CLOUD=true

  # RabbitMQ avec management
  rabbitmq:
    image: rabbitmq:3.13-management
    environment:
      - RABBITMQ_DEFAULT_USER=medical
      - RABBITMQ_DEFAULT_PASS=${RABBITMQ_PASSWORD}
      - RABBITMQ_VM_MEMORY_HIGH_WATERMARK=0.6
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq
    ports:
      - "15672:15672"  # Management UI

  # PostgreSQL avec configuration optimisée
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=medical
      - POSTGRES_USER=medical
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_INITDB_ARGS=--encoding=UTF8 --data-checksums
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    command:
      - "postgres"
      - "-c"
      - "max_connections=200"
      - "-c"
      - "shared_buffers=2GB"
      - "-c"
      - "effective_cache_size=6GB"
      - "-c"
      - "maintenance_work_mem=512MB"

  # Redis pour cache et sessions
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --maxmemory 2gb --maxmemory-policy allkeys-lru
    volumes:
      - redis-data:/data

  # Odoo 19 Community Edition (GRATUIT)
  odoo:
    image: odoo:19  # Version Community par défaut
    depends_on:
      - postgres
    environment:
      - HOST=postgres
      - USER=medical
      - PASSWORD=${DB_PASSWORD}
    volumes:
      - odoo-data:/var/lib/odoo
      - ./addons:/mnt/extra-addons
    ports:
      - "8069:8069"

volumes:
  minio-data:
  rabbitmq-data:
  postgres-data:
  redis-data:
  odoo-data:
  models:
  temp-audio:
```

---

## 6. Application Mobile Flutter

### 6.1 Fonctionnalités principales (F)

| Fonctionnalité | Description | Priorité |
|----------------|-------------|----------|
| **Enregistrement** | • Jusqu'à 1h30 stable<br>• Pause/Resume<br>• Indicateur qualité audio<br>• Gestion interruptions (appels) | P0 |
| **Upload résilient** | • S3 Multipart direct<br>• Retry automatique<br>• Reprise après crash<br>• Progress détaillé | P0 |
| **Mode offline** | • Queue locale SQLite<br>• Sync auto au retour réseau<br>• Persistence état | P0 |
| **Sécurité** | • Chiffrement XChaCha20-Poly1305<br>• Keychain/Keystore<br>• JWT + refresh token | P0 |
| **UX** | • Onboarding < 5min<br>• Thème sombre<br>• Accessibility (VoiceOver/TalkBack) | P1 |

### 6.2 Architecture technique Flutter (T)

```dart
// Structure des packages
lib/
├── core/
│   ├── api/           # Client API REST
│   ├── auth/          # OIDC/JWT management  
│   ├── crypto/        # Chiffrement XChaCha20
│   └── storage/       # SQLite + Secure Storage
├── features/
│   ├── recording/     # Audio capture & segments
│   ├── upload/        # S3 Multipart manager
│   ├── consultation/  # Liste et détails
│   └── search/        # Recherche locale/remote
├── shared/
│   ├── widgets/       # Composants réutilisables
│   └── theme/         # Design system
└── main.dart
```

### 6.3 Gestion upload S3 Multipart optimisée (T)

```dart
class S3MultipartUploadManager {
  // Configuration adaptative selon taille fichier
  int calculateOptimalPartSize(int fileSizeMB) {
    if (fileSizeMB < 50) return 10 * 1024 * 1024;      // 10 MiB
    if (fileSizeMB < 200) return 20 * 1024 * 1024;     // 20 MiB
    return 25 * 1024 * 1024;                            // 25 MiB
  }

  // Upload avec reprise après échec
  Future<void> uploadWithResume(File audioFile) async {
    // 1. Vérifier si upload en cours dans SQLite
    final existingUpload = await db.getIncompleteUpload(audioFile.path);
    
    // 2. Initialiser ou reprendre
    final uploadId = existingUpload?.uploadId ?? 
                     await api.initializeMultipartUpload();
    
    // 3. Calculer parts optimales
    final partSize = calculateOptimalPartSize(audioFile.lengthSync() ~/ 1024 / 1024);
    final parts = splitFileIntoParts(audioFile, partSize);
    
    // 4. Upload parallèle avec retry
    final pool = Pool(3); // 3 uploads simultanés max
    await Future.wait(
      parts.map((part) => pool.withResource(
        () => uploadPartWithRetry(uploadId, part)
      ))
    );
    
    // 5. Finaliser
    await api.completeMultipartUpload(uploadId, parts);
    await db.deleteUploadRecord(uploadId);
  }
  
  // Retry exponentiel intelligent
  Future<void> uploadPartWithRetry(String uploadId, Part part, {int attempt = 0}) async {
    try {
      await uploadPart(uploadId, part);
    } catch (e) {
      if (attempt < 5) {
        final delay = Duration(seconds: math.pow(2, attempt));
        await Future.delayed(delay);
        return uploadPartWithRetry(uploadId, part, attempt: attempt + 1);
      }
      throw e;
    }
  }
}
```

### 6.4 Packages Flutter essentiels (T)

| Package | Version | Usage |
|---------|---------|--------|
| `record` | ^5.0.0 | Enregistrement audio cross-platform |
| `dio` | ^5.4.0 | HTTP client avec interceptors |
| `drift` | ^2.14.0 | SQLite réactive pour persistence |
| `flutter_secure_storage` | ^9.0.0 | Stockage sécurisé credentials |
| `crypto` | ^3.0.0 | Hashing et validation |
| `workmanager` | ^0.5.0 | Background tasks Android/iOS |
| `connectivity_plus` | ^5.0.0 | Détection réseau |
| `path_provider` | ^2.1.0 | Accès filesystem |

---

## 7. API Gateway FastAPI (T)

### 7.1 Endpoints principaux

```python
# Authentification
POST   /api/v1/auth/login              # Login médecin → JWT
POST   /api/v1/auth/refresh            # Refresh token
POST   /api/v1/auth/logout             # Révocation token

# Upload Management  
POST   /api/v1/uploads/init            # Init multipart → uploadId
POST   /api/v1/uploads/{id}/urls       # Génère URLs pré-signées pour parts
POST   /api/v1/uploads/{id}/complete   # Finalise upload
DELETE /api/v1/uploads/{id}            # Annule upload

# Consultations
GET    /api/v1/consultations           # Liste paginée + filtres
POST   /api/v1/consultations           # Créer consultation
GET    /api/v1/consultations/{id}      # Détails + transcription
PATCH  /api/v1/consultations/{id}      # Éditer transcription
DELETE /api/v1/consultations/{id}      # Suppression RGPD

# Recherche
GET    /api/v1/search                  # Recherche full-text
GET    /api/v1/search/suggestions      # Auto-complétion

# Monitoring
GET    /health                         # Health check
GET    /metrics                        # Prometheus metrics
```

### 7.2 Sécurité et performance

```python
from fastapi import FastAPI, Depends, HTTPException
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter
import redis.asyncio as redis

app = FastAPI(title="Medical Recording API", version="3.0.0")

# Configuration GPU Cloud Providers
GPU_PROVIDERS = {
    "runpod": {
        "api_key": os.getenv("RUNPOD_API_KEY"),
        "default_gpu": "RTX 4090",
        "max_price": 0.74,
        "timeout": 300
    },
    "vast_ai": {
        "api_key": os.getenv("VAST_AI_API_KEY"),
        "default_gpu": "RTX 3090",
        "max_price": 0.40,
        "timeout": 600
    }
}

# Rate limiting par endpoint ET par utilisateur
@app.post("/api/v1/uploads/init", 
          dependencies=[Depends(RateLimiter(times=10, seconds=60))])
async def init_upload(
    consultation: ConsultationCreate,
    current_user: User = Depends(get_current_user),
    cache: redis.Redis = Depends(get_redis)
):
    # Vérifier quota utilisateur
    daily_uploads = await cache.incr(f"uploads:{current_user.id}:{date.today()}")
    if daily_uploads > 20:  # Max 20 consultations/jour
        raise HTTPException(429, "Quota journalier dépassé")
    
    # Déterminer la priorité selon l'heure et la charge
    current_hour = datetime.now().hour
    queue_depth = await get_queue_depth()
    
    priority = "normal"
    if consultation.urgent or (8 <= current_hour <= 18 and queue_depth > 5):
        priority = "urgent"
        # Vérifier disponibilité GPU cloud
        gpu_available = await check_gpu_availability()
        if not gpu_available:
            logger.warning("GPU cloud unavailable, falling back to CPU")
            priority = "normal"
    
    # Créer consultation Odoo
    consultation_id = await odoo_rpc.create_consultation(
        doctor_id=current_user.odoo_id,
        priority=priority,
        **consultation.dict()
    )
    
    # Générer uploadId MinIO
    upload_id = await minio_client.create_multipart_upload(
        bucket=f"medical-audio-{ENVIRONMENT}",
        key=f"doctor_{current_user.id}/consultation_{consultation_id}/audio.m4a"
    )
    
    # Cache uploadId avec TTL 2h
    await cache.setex(
        f"upload:{upload_id}", 
        7200, 
        json.dumps({
            "consultation_id": consultation_id,
            "doctor_id": current_user.id,
            "priority": priority,
            "created_at": datetime.now().isoformat()
        })
    )
    
    return {
        "upload_id": upload_id,
        "consultation_id": consultation_id,
        "priority": priority,
        "estimated_processing_time": "2-3 min" if priority == "urgent" else "15-20 min",
        "expires_at": datetime.now() + timedelta(hours=2)
    }

# Endpoint pour vérifier le statut GPU
@app.get("/api/v1/gpu/status")
async def gpu_status(current_user: User = Depends(get_current_admin_user)):
    """Admin only - Vérifier le statut des providers GPU"""
    status = {}
    
    for provider, config in GPU_PROVIDERS.items():
        try:
            if provider == "runpod":
                client = runpod.API(api_key=config["api_key"])
                pods = await client.get_pods()
                gpu_available = await client.get_gpu_availability(config["default_gpu"])
                status[provider] = {
                    "available": gpu_available,
                    "active_pods": len(pods),
                    "current_price": gpu_available.get("price", config["max_price"])
                }
            elif provider == "vast_ai":
                client = VastAI(api_key=config["api_key"])
                instances = await client.list_instances()
                offers = await client.search_offers(gpu_name=config["default_gpu"])
                status[provider] = {
                    "available": len(offers) > 0,
                    "active_instances": len(instances),
                    "best_price": offers[0]["price"] if offers else config["max_price"]
                }
        except Exception as e:
            status[provider] = {"error": str(e), "available": False}
    
    # Ajouter métriques de traitement
    metrics = await get_processing_metrics()
    status["metrics"] = {
        "queue_cpu": metrics["queue_depth_cpu"],
        "queue_gpu": metrics["queue_depth_gpu"],
        "avg_time_cpu": metrics["avg_processing_time_cpu"],
        "avg_time_gpu": metrics["avg_processing_time_gpu"],
        "cost_today": metrics["gpu_cost_today"]
    }
    
    return status

# Circuit breaker pour services externes
from circuitbreaker import circuit

@circuit(failure_threshold=5, recovery_timeout=60)
async def call_odoo_api(method: str, *args, **kwargs):
    """Appel Odoo avec circuit breaker"""
    try:
        return await odoo_client.execute(method, *args, **kwargs)
    except Exception as e:
        logger.error(f"Odoo API error: {e}")
        raise

# Middleware de logging structuré
@app.middleware("http")
async def log_requests(request: Request, call_next):
    request_id = str(uuid.uuid4())
    start_time = time.time()
    
    # Ajouter request_id au contexte
    request.state.request_id = request_id
    
    response = await call_next(request)
    
    # Log structuré JSON
    logger.info({
        "request_id": request_id,
        "method": request.method,
        "path": request.url.path,
        "status": response.status_code,
        "duration_ms": int((time.time() - start_time) * 1000),
        "user_id": getattr(request.state, "user_id", None)
    })
    
    return response
```

---

## 8. Stockage MinIO (T)

### 8.1 Configuration optimisée

```bash
# Structure buckets
medical-audio-prod/
├── doctor_{id}/
│   ├── consultation_{id}/
│   │   ├── audio.m4a.encrypted     # Audio chiffré temporaire
│   │   └── metadata.json           # Métadonnées consultation
│   └── temp/                       # Uploads incomplets
└── _lifecycle/                     # Logs purge automatique

# Policies IAM granulaires
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"AWS": "arn:aws:iam::mobile-app"},
      "Action": [
        "s3:PutObject",
        "s3:PutObjectPart",
        "s3:CompleteMultipartUpload"
      ],
      "Resource": "arn:aws:s3:::medical-audio-prod/doctor_${aws:userid}/*"
    }
  ]
}

# Lifecycle rules
<LifecycleConfiguration>
  <Rule>
    <ID>cleanup-incomplete-uploads</ID>
    <Status>Enabled</Status>
    <AbortIncompleteMultipartUpload>
      <DaysAfterInitiation>1</DaysAfterInitiation>
    </AbortIncompleteMultipartUpload>
  </Rule>
  <Rule>
    <ID>delete-processed-audio</ID>
    <Status>Enabled</Status>
    <Expiration>
      <Days>7</Days>
    </Expiration>
    <NoncurrentVersionExpiration>
      <NoncurrentDays>1</NoncurrentDays>
    </NoncurrentVersionExpiration>
  </Rule>
</LifecycleConfiguration>
```

### 8.2 Event notifications vers RabbitMQ

```yaml
# Configuration MinIO events
mc admin config set myminio notify_amqp:primary \
  url="amqp://medical:password@rabbitmq:5672" \
  exchange="minio-events" \
  exchange_type="topic" \
  routing_key="audio.uploaded" \
  durable="on" \
  auto_deleted="off"

# Activation events
mc event add myminio/medical-audio-prod \
  arn:minio:sqs::primary:amqp \
  --event "s3:ObjectCreated:CompleteMultipartUpload" \
  --suffix ".m4a"
```

---

## 9. Pipeline de traitement (T)

### 9.1 Architecture des Workers

```python
# Worker Whisper Hybride avec GPU Cloud
class HybridWhisperWorker:
    def __init__(self):
        # Modèle CPU local pour traitement normal
        self.local_model = WhisperModel("medium", 
                                        device="cpu",
                                        compute_type="int8")
        
        # Clients GPU cloud
        self.runpod_client = runpod.API(api_key=os.getenv("RUNPOD_API_KEY"))
        self.vastai_client = VastAI(api_key=os.getenv("VAST_AI_API_KEY"))
        
        self.temp_dir = Path("/tmp/audio")
        self.gpu_provider = os.getenv("GPU_PROVIDER", "runpod")  # ou "vast_ai"
        
    async def process_transcription(self, message: dict):
        consultation_id = message["consultation_id"]
        audio_path = message["audio_path"]
        priority = message.get("priority", "normal")
        
        try:
            # 1. Télécharger depuis MinIO
            local_path = await self.download_audio(audio_path)
            
            # 2. Déchiffrer audio
            decrypted_path = await self.decrypt_audio(local_path)
            
            # 3. Choisir méthode de traitement selon priorité
            if priority == "urgent" and self.is_gpu_cloud_enabled():
                transcript = await self.transcribe_gpu_cloud(decrypted_path)
            else:
                transcript = await self.transcribe_local_cpu(decrypted_path)
            
            # 4. Sauvegarder dans Odoo
            await self.save_to_odoo(consultation_id, transcript)
            
            # 5. Publier pour résumé
            await self.publish_for_summary(consultation_id, transcript)
            
            # 6. Nettoyer
            await self.cleanup_files(local_path, decrypted_path)
            await self.delete_from_minio(audio_path)
            
        except Exception as e:
            logger.error(f"Transcription failed: {e}")
            await self.send_to_dlq(message, str(e))
            raise
    
    async def transcribe_local_cpu(self, audio_path: str):
        """Transcription CPU locale - 15-20min pour 1h audio"""
        logger.info(f"Starting CPU transcription for {audio_path}")
        
        segments, info = self.local_model.transcribe(
            audio_path,
            language="fr",
            beam_size=3,  # Réduit pour CPU
            best_of=3,
            temperature=0,
            vad_filter=True,
            vad_parameters=dict(
                min_silence_duration_ms=500,
                speech_pad_ms=200
            )
        )
        
        return self.format_transcript(segments)
    
    async def transcribe_gpu_cloud(self, audio_path: str):
        """Transcription GPU cloud - 2-3min pour 1h audio"""
        logger.info(f"Starting GPU cloud transcription via {self.gpu_provider}")
        
        # Chiffrer l'audio pour le cloud
        encrypted_audio = await self.encrypt_for_cloud(audio_path)
        
        if self.gpu_provider == "runpod":
            return await self.transcribe_runpod(encrypted_audio)
        elif self.gpu_provider == "vast_ai":
            return await self.transcribe_vastai(encrypted_audio)
        else:
            # Fallback sur CPU local
            return await self.transcribe_local_cpu(audio_path)
    
    async def transcribe_runpod(self, encrypted_audio: bytes):
        """RunPod - RTX 4090 à 0.74€/heure"""
        try:
            # Créer un pod temporaire
            pod = await self.runpod_client.create_pod(
                name=f"whisper-{uuid.uuid4().hex[:8]}",
                image_name="runpod/whisper:large-v3",
                gpu_type_id="NVIDIA RTX 4090",
                cloud_type="SECURE",  # Pour données sensibles
                container_disk_in_gb=10,
                volume_in_gb=0,
                min_vcpu_count=4,
                min_memory_in_gb=16,
                bid_per_gpu=0.74,  # Prix max accepté
                stop_after=300,  # Auto-stop après 5min
                env={
                    "MODEL_SIZE": "large-v3",
                    "LANGUAGE": "fr"
                }
            )
            
            # Attendre que le pod soit prêt
            await self.wait_for_pod_ready(pod["id"])
            
            # Envoyer l'audio et récupérer la transcription
            result = await self.runpod_client.run_sync(
                pod_id=pod["id"],
                input={
                    "audio_base64": base64.b64encode(encrypted_audio).decode(),
                    "task": "transcribe",
                    "language": "fr",
                    "return_timestamps": True
                }
            )
            
            # Terminer le pod
            await self.runpod_client.terminate_pod(pod["id"])
            
            # Déchiffrer et retourner le résultat
            return self.decrypt_cloud_response(result["output"]["transcription"])
            
        except Exception as e:
            logger.error(f"RunPod transcription failed: {e}")
            # Fallback sur CPU local
            return await self.transcribe_local_cpu(audio_path)
    
    async def transcribe_vastai(self, encrypted_audio: bytes):
        """Vast.ai - RTX 3090 à 0.20-0.40€/heure"""
        try:
            # Rechercher une instance disponible
            offers = await self.vastai_client.search_offers(
                gpu_name="RTX 3090",
                num_gpus=1,
                disk_space=10,
                inet_up_cost_max=0.40,  # Prix max/heure
                sort_by="price"
            )
            
            if not offers:
                raise Exception("No Vast.ai instances available")
            
            # Louer l'instance la moins chère
            instance = await self.vastai_client.create_instance(
                offer_id=offers[0]["id"],
                image="vastai/whisper:latest",
                env={
                    "MODEL": "large-v3",
                    "LANG": "fr"
                }
            )
            
            # Attendre que l'instance soit prête
            await self.wait_for_instance(instance["id"])
            
            # Exécuter la transcription
            result = await self.vastai_client.run_command(
                instance_id=instance["id"],
                command=f"python transcribe.py --audio_base64 {base64.b64encode(encrypted_audio).decode()}"
            )
            
            # Détruire l'instance
            await self.vastai_client.destroy_instance(instance["id"])
            
            return self.decrypt_cloud_response(result["output"])
            
        except Exception as e:
            logger.error(f"Vast.ai transcription failed: {e}")
            # Fallback sur CPU local
            return await self.transcribe_local_cpu(audio_path)

# Worker LLM avec templates
class LLMWorker:
    def __init__(self):
        self.ollama = Ollama(model="llama3.1:8b-instruct")
        self.summary_template = """
        Tu es un assistant médical qui créé des résumés neutres et factuels.
        
        Consignes:
        - Résume la consultation en 3-5 paragraphes
        - Reste factuel et descriptif
        - Ne pose AUCUN diagnostic
        - Organise par: motif, examen, observations
        - Utilise un ton professionnel
        
        Transcription:
        {transcript}
        
        Résumé structuré:
        """
        
    async def process_summary(self, message: dict):
        consultation_id = message["consultation_id"]
        transcript = message["transcript"]
        
        try:
            # 1. Générer résumé avec retry
            summary = await self.generate_summary_with_retry(transcript)
            
            # 2. Extraire mots-clés
            keywords = await self.extract_keywords(transcript)
            
            # 3. Sauvegarder dans Odoo
            await self.update_odoo_consultation(
                consultation_id,
                summary=summary,
                keywords=keywords,
                state="processed"
            )
            
            # 4. Notification completion
            await self.notify_completion(consultation_id)
            
        except Exception as e:
            logger.error(f"Summary generation failed: {e}")
            raise
    
    async def generate_summary_with_retry(self, transcript: str, max_retries: int = 3):
        for attempt in range(max_retries):
            try:
                response = await self.ollama.generate(
                    prompt=self.summary_template.format(transcript=transcript),
                    temperature=0.3,
                    max_tokens=500
                )
                
                # Validation du résumé
                if self.validate_summary(response):
                    return response
                    
            except Exception as e:
                if attempt == max_retries - 1:
                    raise
                await asyncio.sleep(2 ** attempt)

# Dispatcher intelligent pour router les tâches
class TranscriptionDispatcher:
    def __init__(self):
        self.metrics = PrometheusMetrics()
        
    async def route_transcription(self, message: dict):
        """Route intelligemment vers CPU ou GPU selon critères"""
        
        audio_duration = message.get("duration_minutes", 0)
        current_hour = datetime.now().hour
        queue_depth = await self.get_queue_depth()
        
        # Critères pour GPU cloud
        use_gpu = (
            audio_duration > 30 or  # Audio > 30min
            message.get("priority") == "urgent" or  # Demande urgente
            (8 <= current_hour <= 18 and queue_depth > 5)  # Heures ouvrées + queue chargée
        )
        
        if use_gpu and self.is_gpu_available():
            message["priority"] = "urgent"
            await self.metrics.increment("transcriptions_gpu")
            logger.info(f"Routing to GPU cloud: {message['consultation_id']}")
        else:
            message["priority"] = "normal"
            await self.metrics.increment("transcriptions_cpu")
            logger.info(f"Routing to CPU local: {message['consultation_id']}")
        
        return message
```

### 9.2 Configuration RabbitMQ

```python
# Exchanges et queues
EXCHANGES = {
    "medical.pipeline": {
        "type": "topic",
        "durable": True
    }
}

QUEUES = {
    "transcription.requests": {
        "durable": True,
        "arguments": {
            "x-message-ttl": 7200000,  # 2 heures
            "x-max-length": 1000,
            "x-dead-letter-exchange": "medical.dlx"
        }
    },
    "summary.requests": {
        "durable": True,
        "arguments": {
            "x-message-ttl": 3600000,  # 1 heure
            "x-max-priority": 10
        }
    },
    "cleanup.tasks": {
        "durable": True,
        "arguments": {
            "x-message-ttl": 86400000  # 24 heures
        }
    }
}

BINDINGS = [
    ("medical.pipeline", "audio.uploaded", "transcription.requests"),
    ("medical.pipeline", "transcript.completed", "summary.requests"),
    ("medical.pipeline", "summary.completed", "cleanup.tasks")
]
```

---

## 10. Module Odoo 19

### 10.0 Considérations Odoo Community vs Enterprise

| Aspect | Community (Gratuit) | Enterprise (Payant) | Impact Projet |
|--------|---------------------|---------------------|---------------|
| **Coût** | 0€ | 40€/user/mois | ✅ Économie 400€/mois |
| **Support** | Communauté uniquement | Support officiel | ⚠️ Prévoir expertise interne |
| **Modules** | Base + OCA | Tous modules | ✅ Suffisant pour ce projet |
| **Multi-company** | ✅ Disponible | ✅ Disponible | ✅ Multi-tenant OK |
| **API REST** | Via module tiers | Native | ⚠️ Installer rest_framework |
| **Performance** | Identique | Identique | ✅ Pas d'impact |
| **Code source** | Open source | Propriétaire + Open | ✅ Personnalisation totale |

**Recommandation** : Odoo Community est **parfaitement adapté** pour ce projet. Les fonctionnalités Enterprise non disponibles (comptabilité avancée, signature, IoT) ne sont pas nécessaires.

### 10.1 Modèle de données (T)

```python
# medical_consultation/models/consultation.py
from odoo import models, fields, api

class MedicalConsultation(models.Model):
    _name = 'medical.consultation'
    _description = 'Consultation Médicale'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'consultation_date desc'
    
    # Champs principaux
    name = fields.Char('Référence', required=True, default='New', copy=False)
    doctor_id = fields.Many2one('res.users', 'Médecin', 
                                required=True, 
                                default=lambda self: self.env.user,
                                domain=[('groups_id', 'in', self.env.ref('medical.group_doctor').id)])
    patient_id = fields.Many2one('res.partner', 'Patient', 
                                 domain=[('is_patient', '=', True)])
    
    # Timestamps
    consultation_date = fields.Datetime('Date consultation', required=True, default=fields.Datetime.now)
    duration_minutes = fields.Integer('Durée (min)')
    created_date = fields.Datetime('Créé le', readonly=True, default=fields.Datetime.now)
    processed_date = fields.Datetime('Traité le', readonly=True)
    
    # Contenu
    audio_upload_id = fields.Char('Upload ID', readonly=True, index=True)
    transcript_text = fields.Text('Transcription', tracking=True)
    transcript_version = fields.Integer('Version transcription', default=1)
    summary_text = fields.Text('Résumé')
    keywords = fields.Char('Mots-clés', compute='_compute_keywords', store=True)
    
    # État et workflow
    state = fields.Selection([
        ('draft', 'Brouillon'),
        ('uploading', 'Upload en cours'),
        ('processing', 'Traitement IA'),
        ('processed', 'Traité'),
        ('validated', 'Validé'),
        ('error', 'Erreur')
    ], default='draft', tracking=True)
    
    # RGPD
    audio_deleted = fields.Boolean('Audio supprimé', readonly=True, default=False)
    audio_deleted_date = fields.Datetime('Supprimé le', readonly=True)
    retention_days = fields.Integer('Rétention (jours)', default=365)
    
    # Relations
    attachment_ids = fields.Many2many('ir.attachment', string='Pièces jointes')
    history_ids = fields.One2many('medical.consultation.history', 'consultation_id', 'Historique')
    
    # Méthodes
    @api.model
    def create(self, vals):
        if vals.get('name', 'New') == 'New':
            vals['name'] = self.env['ir.sequence'].next_by_code('medical.consultation') or 'New'
        return super().create(vals)
    
    def action_process(self):
        """Lance le traitement IA"""
        self.ensure_one()
        self.state = 'processing'
        # Publier message RabbitMQ
        self.env['medical.rabbitmq'].publish_message(
            'medical.pipeline',
            'audio.uploaded',
            {
                'consultation_id': self.id,
                'audio_path': f"doctor_{self.doctor_id.id}/consultation_{self.id}/audio.m4a"
            }
        )
    
    @api.model
    def cleanup_old_audio(self):
        """Cron job pour nettoyer les audios"""
        cutoff_date = fields.Datetime.now() - timedelta(days=1)
        consultations = self.search([
            ('state', '=', 'processed'),
            ('audio_deleted', '=', False),
            ('processed_date', '<', cutoff_date)
        ])
        for consultation in consultations:
            consultation.delete_audio()
```

### 10.2 Sécurité multi-tenant (T)

```xml
<!-- medical_consultation/security/security.xml -->
<odoo>
    <!-- Groupes -->
    <record id="group_medical_user" model="res.groups">
        <field name="name">Médecin</field>
        <field name="category_id" ref="base.module_category_medical"/>
    </record>
    
    <record id="group_medical_admin" model="res.groups">
        <field name="name">Administrateur Médical</field>
        <field name="category_id" ref="base.module_category_medical"/>
        <field name="implied_ids" eval="[(4, ref('group_medical_user'))]"/>
    </record>
    
    <!-- Record Rules - Isolation par médecin -->
    <record id="consultation_doctor_rule" model="ir.rule">
        <field name="name">Consultation: voir uniquement les siennes</field>
        <field name="model_id" ref="model_medical_consultation"/>
        <field name="domain_force">[('doctor_id', '=', user.id)]</field>
        <field name="groups" eval="[(4, ref('group_medical_user'))]"/>
        <field name="perm_read" eval="True"/>
        <field name="perm_write" eval="True"/>
        <field name="perm_create" eval="True"/>
        <field name="perm_unlink" eval="False"/>
    </record>
    
    <!-- Admin voit tout -->
    <record id="consultation_admin_rule" model="ir.rule">
        <field name="name">Consultation: admin voit tout</field>
        <field name="model_id" ref="model_medical_consultation"/>
        <field name="domain_force">[(1, '=', 1)]</field>
        <field name="groups" eval="[(4, ref('group_medical_admin'))]"/>
    </record>
</odoo>
```

### 10.3 Interface web (F)

```xml
<!-- medical_consultation/views/consultation_views.xml -->
<odoo>
    <!-- Vue liste optimisée -->
    <record id="view_consultation_tree" model="ir.ui.view">
        <field name="name">medical.consultation.tree</field>
        <field name="model">medical.consultation</field>
        <field name="arch" type="xml">
            <tree string="Consultations" default_order="consultation_date desc">
                <field name="name"/>
                <field name="patient_id"/>
                <field name="consultation_date" widget="datetime"/>
                <field name="duration_minutes"/>
                <field name="state" widget="badge" decoration-success="state == 'processed'" 
                                                  decoration-warning="state == 'processing'"
                                                  decoration-danger="state == 'error'"/>
                <field name="keywords" optional="show"/>
            </tree>
        </field>
    </record>
    
    <!-- Vue formulaire avec onglets -->
    <record id="view_consultation_form" model="ir.ui.view">
        <field name="name">medical.consultation.form</field>
        <field name="model">medical.consultation</field>
        <field name="arch" type="xml">
            <form string="Consultation">
                <header>
                    <button name="action_process" string="Lancer traitement" 
                            type="object" class="btn-primary"
                            states="draft,error"/>
                    <button name="action_validate" string="Valider" 
                            type="object" class="btn-success"
                            states="processed"/>
                    <field name="state" widget="statusbar"/>
                </header>
                <sheet>
                    <div class="oe_title">
                        <h1><field name="name"/></h1>
                    </div>
                    <group>
                        <group>
                            <field name="patient_id"/>
                            <field name="consultation_date"/>
                            <field name="duration_minutes" widget="float_time"/>
                        </group>
                        <group>
                            <field name="doctor_id" readonly="1"/>
                            <field name="created_date"/>
                            <field name="processed_date"/>
                        </group>
                    </group>
                    <notebook>
                        <page string="Transcription">
                            <field name="transcript_text" widget="text_editor"/>
                            <group>
                                <field name="transcript_version" readonly="1"/>
                            </group>
                        </page>
                        <page string="Résumé">
                            <field name="summary_text" widget="html" readonly="1"/>
                            <group>
                                <field name="keywords" widget="many2many_tags"/>
                            </group>
                        </page>
                        <page string="Historique">
                            <field name="history_ids">
                                <tree>
                                    <field name="create_date"/>
                                    <field name="user_id"/>
                                    <field name="action"/>
                                </tree>
                            </field>
                        </page>
                    </notebook>
                </sheet>
                <div class="oe_chatter">
                    <field name="message_follower_ids"/>
                    <field name="activity_ids"/>
                    <field name="message_ids"/>
                </div>
            </form>
        </field>
    </record>
    
    <!-- Vue recherche avec filtres -->
    <record id="view_consultation_search" model="ir.ui.view">
        <field name="name">medical.consultation.search</field>
        <field name="model">medical.consultation</field>
        <field name="arch" type="xml">
            <search string="Recherche Consultations">
                <field name="name"/>
                <field name="patient_id"/>
                <field name="transcript_text"/>
                <field name="summary_text"/>
                <field name="keywords"/>
                <filter name="today" string="Aujourd'hui" 
                        domain="[('consultation_date', '>=', datetime.datetime.now().replace(hour=0, minute=0, second=0))]"/>
                <filter name="week" string="Cette semaine" 
                        domain="[('consultation_date', '>=', (datetime.datetime.now() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]"/>
                <separator/>
                <filter name="processed" string="Traités" domain="[('state', '=', 'processed')]"/>
                <filter name="error" string="En erreur" domain="[('state', '=', 'error')]"/>
                <group expand="0" string="Grouper par">
                    <filter name="group_patient" string="Patient" context="{'group_by': 'patient_id'}"/>
                    <filter name="group_date" string="Date" context="{'group_by': 'consultation_date:day'}"/>
                    <filter name="group_state" string="État" context="{'group_by': 'state'}"/>
                </group>
            </search>
        </field>
    </record>
</odoo>
```

---

## 11. Sécurité et RGPD

### 11.1 Architecture de sécurité (T)

| Couche | Mesures | Technologies |
|--------|---------|--------------|
| **Transport** | • TLS 1.3 minimum<br>• Certificate pinning mobile<br>• HSTS headers | Nginx, Let's Encrypt |
| **Authentification** | • OAuth2/OIDC avec PKCE<br>• JWT short-lived (15min)<br>• Refresh tokens (7 jours)<br>• 2FA optionnel | FastAPI-Security |
| **Autorisation** | • RBAC Odoo<br>• Row-level security<br>• API scopes | Odoo ACL |
| **Données au repos** | • PostgreSQL TDE<br>• MinIO SSE-S3<br>• Redis AOF encrypted | Native encryption |
| **Données en transit** | • XChaCha20-Poly1305 (mobile)<br>• AES-256-GCM (API) | libsodium |
| **Audit** | • Logs immutables<br>• Event sourcing<br>• Monitoring temps réel | Prometheus, Loki |

### 11.2 Conformité RGPD (F+T)

```python
# Implémentation RGPD dans API
class RGPDCompliance:
    @staticmethod
    async def handle_deletion_request(user_id: int):
        """Article 17 - Droit à l'effacement"""
        # 1. Anonymiser consultations
        await db.execute("""
            UPDATE consultations 
            SET patient_id = NULL,
                transcript_text = 'DELETED',
                summary_text = 'DELETED',
                deleted_at = NOW()
            WHERE doctor_id = $1
        """, user_id)
        
        # 2. Supprimer audios MinIO
        objects = await minio.list_objects(f"doctor_{user_id}/")
        for obj in objects:
            await minio.remove_object(obj.name)
        
        # 3. Purger cache Redis
        await redis.delete(f"user:{user_id}:*")
        
        # 4. Log audit
        await audit_log.record(
            action="RGPD_DELETION",
            user_id=user_id,
            timestamp=datetime.now()
        )
    
    @staticmethod
    async def export_user_data(user_id: int) -> bytes:
        """Article 20 - Portabilité des données"""
        data = {
            "user": await get_user_profile(user_id),
            "consultations": await get_all_consultations(user_id),
            "audit_logs": await get_user_audit_logs(user_id)
        }
        return json.dumps(data, indent=2).encode('utf-8')
```

### 11.3 Plan de réponse aux incidents (T)

| Incident | Détection | Réponse | Recovery |
|----------|-----------|---------|----------|
| **Breach données** | • IDS alerts<br>• Log anomalies | • Isolation immédiate<br>• Notification CNIL 72h<br>• Audit forensics | • Rotation clés<br>• Patch vulnérabilité<br>• Notification users |
| **Accès non autorisé** | • Failed login spikes<br>• Geo anomalies | • Block IP<br>• Force password reset<br>• Review logs | • 2FA mandatory<br>• Session invalidation |
| **Data loss** | • Backup failures<br>• Corruption detected | • Stop writes<br>• Assess damage | • Restore from backup<br>• Replay WAL logs |
| **Ransomware** | • File encryption detected<br>• Unusual I/O | • Network isolation<br>• Kill switches | • Clean restore<br>• Threat hunt |

---

## 12. Tests et Qualité

### 12.1 Stratégie de tests (T)

```yaml
# Pyramide de tests
Unit Tests (70%):
  - Business logic
  - Data validation  
  - Security functions
  - Coverage: >80%

Integration Tests (20%):
  - API endpoints
  - Database operations
  - Queue messaging
  - MinIO operations

E2E Tests (10%):
  - Critical user flows
  - Upload → Transcription → Display
  - Mobile → API → Odoo
  - Performance benchmarks
```

### 12.2 Tests de performance (T)

| Scénario | Mode | Charge | SLA | Mesure |
|----------|------|--------|-----|---------|
| **Upload concurrent** | - | 10 users × 100MB | <30s | p95 latency |
| **Transcription CPU** | Local | 10 audios/hour | <20min/audio | Queue throughput |
| **Transcription GPU** | RunPod | 50 audios/hour | <3min/audio | Cost per audio |
| **Transcription Hybrid** | Mixed | 30 audios (20 CPU + 10 GPU) | <10min avg | Cost optimization |
| **API requests** | - | 1000 req/s | <200ms | p99 response time |
| **Search full-text** | - | 10K consultations | <1s | Query time |
| **Interface Odoo** | - | 20 users simultanés | <2s page load | FCP, LCP |
| **GPU failover** | CPU fallback | GPU unavailable | <30min | Degradation graceful |
| **Cost tracking** | - | 100 transcriptions/day | <0.50€/audio | Budget adherence |

### 12.3 Tests de sécurité (T)

```bash
# Checklist sécurité
□ OWASP Top 10 scan (ZAP/Burp Suite)
□ Dependency scanning (Snyk/Safety)
□ Container scanning (Trivy)
□ SQL injection tests
□ JWT manipulation attempts
□ Rate limiting validation
□ RBAC bypass attempts
□ Encryption verification
□ Backup/restore integrity
□ Penetration testing (quarterly)
```

---

## 13. Phases de développement

### 13.1 Phase 1: MVP (Semaines 1-12)

| Sprint | Livrables | Validation |
|--------|-----------|------------|
| **1-2** | • Setup infrastructure Docker<br>• API Gateway base<br>• Auth JWT | CI/CD opérationnel |
| **3-4** | • Module Odoo base<br>• Modèles et vues<br>• Multi-tenancy | CRUD fonctionnel |
| **5-6** | • App Flutter structure<br>• Enregistrement audio<br>• Upload basique | Recording 5min OK |
| **7-8** | • MinIO setup<br>• S3 Multipart<br>• RabbitMQ config | Upload 100MB OK |
| **9-10** | • Worker Whisper<br>• Worker LLM<br>• Pipeline base | Transcription OK |
| **11-12** | • Tests E2E<br>• Documentation<br>• Déploiement MVP | Demo médecin OK |

### 13.2 Phase 2: Production (Semaines 13-24)

| Sprint | Livrables | Validation |
|--------|-----------|------------|
| **13-14** | • Optimisation uploads<br>• Retry/resume<br>• Offline mode | 1h30 audio OK |
| **15-16** | • Recherche full-text<br>• Filtres avancés<br>• Export PDF | Performance <1s |
| **17-18** | • Monitoring complet<br>• Alerting<br>• Dashboards | Observability OK |
| **19-20** | • Sécurité renforcée<br>• RGPD compliance<br>• Audit logs | Pentest passed |
| **21-22** | • Performance tuning<br>• Cache strategy<br>• CDN setup | Load test OK |
| **23-24** | • Documentation finale<br>• Formation users<br>• Go-live | Production ready |

### 13.3 Phase 3: Scale (Mois 7-12)

- Migration vers architecture 5 serveurs
- Kubernetes orchestration
- Auto-scaling workers
- API publique
- Multi-langue (EN, ES, DE)
- Module facturation
- Analytics avancés
- Intégrations tierces

---

## 14. Estimations et KPIs

### 14.1 Effort développement (T)

| Composant | Effort (j.h) | Complexité | Risque |
|-----------|--------------|------------|--------|
| **App Mobile Flutter** | 50-60 | Haute | Upload robuste |
| **API Gateway** | 35-40 | Moyenne | Orchestration |
| **Module Odoo 19** | 25-30 | Moyenne | Multi-tenant |
| **Workers IA** | 30-35 | Haute | Performance GPU |
| **Infrastructure** | 20-25 | Moyenne | Monitoring |
| **Tests & QA** | 30-35 | Haute | E2E complexity |
| **Documentation** | 10-15 | Faible | - |
| **TOTAL** | **200-240** | - | - |

### 14.2 Budget infrastructure (T)

#### Configuration MVP (10 médecins) - Avec Odoo Community
```
Infrastructure de base:
├── Serveur 1 (App):          180€/mois
│   └── 8 cores, 32GB RAM, 500GB SSD
├── Serveur 2 (Processing):   220€/mois
│   └── 12 cores, 32GB RAM, 1TB SSD
├── Stockage backups:           40€/mois
├── Bande passante (1TB):       30€/mois
└── Domaine + SSL:                2€/mois

Services cloud:
├── GPU RunPod/Vast.ai:         25€/mois
│   └── ~30h à 0.74€/h ou 60h à 0.40€/h
├── Emails (Brevo):             10€/mois
└── Monitoring (optionnel):      0€/mois

Licences:
├── Odoo Community:              0€/mois ✓
├── PostgreSQL:                  0€/mois
└── Tous les composants:         0€/mois

Buffer sécurité (20%):         101€/mois
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL MVP:                     608€/mois
Par médecin:                    61€/mois

Économie vs Odoo Enterprise:   400€/mois
Économie vs GPU dédié:         395€/mois
```

#### Configuration Scale (100 médecins) - Avec optimisations
```
Infrastructure serveurs:
├── Serveur 1 (Gateway):       120€/mois
├── Serveur 2 (Application):   180€/mois  
├── Serveur 3 (Database):      280€/mois
├── Serveur 4 (Storage):       240€/mois
└── Serveur 5 (Workers):       320€/mois
    └── Sans GPU, CPU uniquement

Services cloud flexibles:
├── GPU RunPod (200h/mois):    148€/mois
│   └── RTX 4090 à 0.74€/h heures ouvrées
├── GPU Vast.ai backup:          40€/mois
│   └── RTX 3090 à 0.40€/h pour overflow
├── CDN CloudFlare:              50€/mois
└── Stockage archives (3TB):   120€/mois

Bande passante (10TB):         150€/mois
Monitoring (Grafana Cloud):      50€/mois
Support 24/7 (optionnel):       400€/mois
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL Scale:                 2,098€/mois
Par médecin:                    21€/mois

Économie vs Enterprise:      3,000€/mois
Économie vs GPU dédiés:      1,260€/mois
```

#### Comparatif des options GPU

| Configuration | Coût mensuel | Performance | Avantages | Inconvénients |
|---------------|--------------|-------------|-----------|---------------|
| **CPU only** | 0€ | 15-20min/h audio | Gratuit, simple | Lent |
| **RunPod** | 25-150€ | 2-3min/h audio | Flexible, puissant | Données sortent |
| **Vast.ai** | 15-80€ | 3-4min/h audio | Économique | Moins fiable |
| **GPU dédié** | 420€ | 2min/h audio | Total contrôle | Cher, sous-utilisé |

#### Calcul ROI avec nouvelle config

```python
# Configuration MVP optimisée
coût_mensuel = 608€
coût_par_médecin = 61€

# Gains médecin
temps_gagné = 2h/semaine × 4 semaines = 8h/mois
valeur_temps = 100€/h × 8h = 800€/mois

# ROI
ROI = (800€ - 61€) / 61€ = 12.1x
Retour sur investissement < 3 jours

# Comparaison solutions commerciales
Dragon Medical: 150€/user/mois → 2.5x plus cher
Nuance: 200€/user/mois → 3.3x plus cher
Notre solution: 61€/user/mois → Optimal
```

#### Optimisations budget additionnelles

| Optimisation | Impact | Économie/mois |
|--------------|--------|---------------|
| **Heures creuses GPU** | Traiter la nuit à 0.20€/h | -50€ |
| **Spot instances** | Vast.ai interruptible | -30% |
| **Compression audio** | Opus avant stockage | -20€ |
| **Cache agressif** | Redis pour transcriptions | -15€ |
| **Modèle Whisper medium** | CPU plus rapide | -25€ GPU |

#### Coûts de développement (une fois)

| Phase | Durée | Coût (TJM 500€) |
|-------|-------|-----------------|
| **MVP** | 3 mois | 30,000€ |
| **Production** | 2 mois | 20,000€ |
| **Scale** | 3 mois | 30,000€ |
| **Total** | 8 mois | 80,000€ |

Amortissement sur 24 mois: +140€/mois
Coût total par médecin: 75€/mois (année 1)

### 14.3 KPIs de succès (F)

| KPI | Cible MVP | Cible Prod | Mesure |
|-----|-----------|------------|--------|
| **Disponibilité** | 99% | 99.9% | Uptime monitoring |
| **Performance CPU** | <20min/h | <15min/h | Worker metrics |
| **Performance GPU** | <3min/h | <2min/h | RunPod/Vast metrics |
| **Ratio CPU/GPU** | 80/20 | 60/40 | Cost optimization |
| **Coût par transcription** | <0.30€ | <0.15€ | GPU usage tracking |
| **Précision transcription** | >90% | >95% | User feedback |
| **Adoption utilisateurs** | 60% | 80% | Daily active users |
| **Satisfaction (NPS)** | >30 | >50 | Quarterly survey |
| **Temps onboarding** | <30min | <15min | User tracking |
| **Taux d'erreur upload** | <5% | <2% | API metrics |
| **GPU availability** | >90% | >95% | Provider monitoring |
| **Temps recherche** | <2s | <1s | Query performance |
| **MTTR incidents** | <4h | <1h | Incident tracking |
| **Budget GPU mensuel** | <50€ | <200€ | Cost monitoring |

### 14.4 Métriques de monitoring (T)

```yaml
# Prometheus metrics critiques
Infrastructure:
  - node_cpu_usage_percent
  - node_memory_available_bytes
  - node_disk_io_time_seconds
  - container_restart_count

Application:
  - http_requests_total
  - http_request_duration_seconds
  - upload_success_rate
  - transcription_queue_length_cpu
  - transcription_queue_length_gpu
  - worker_processing_time_seconds_cpu
  - worker_processing_time_seconds_gpu

GPU Cloud:
  - gpu_provider_availability
  - gpu_pod_creation_time
  - gpu_processing_cost_per_hour
  - gpu_fallback_to_cpu_count
  - runpod_api_errors_total
  - vastai_instance_failures

Business:
  - consultations_created_total
  - consultations_processed_cpu
  - consultations_processed_gpu
  - active_users_daily
  - audio_minutes_processed
  - storage_usage_bytes
  - api_quota_remaining
  - gpu_budget_remaining
  - cost_per_transcription_avg

# Alerting rules
- CPU usage > 80% for 5min
- Memory > 90% for 5min  
- Queue depth CPU > 50 for 10min
- Queue depth GPU > 10 for 5min
- GPU provider unavailable for 10min
- GPU budget > 80% consumed
- Error rate > 5% for 5min
- Response time p95 > 1s for 5min
- Transcription time CPU > 30min
- Transcription time GPU > 5min
```

---

## Annexes

### A. Glossaire

| Terme | Définition |
|-------|------------|
| **ASR** | Automatic Speech Recognition (Whisper) |
| **DLQ** | Dead Letter Queue (RabbitMQ) |
| **GPU Cloud** | Location de GPU à la demande (RunPod/Vast.ai) |
| **Hybrid Processing** | Traitement CPU local + GPU cloud selon priorité |
| **MTTR** | Mean Time To Recovery |
| **OCA** | Odoo Community Association (modules communautaires) |
| **RBAC** | Role-Based Access Control |
| **RLS** | Row-Level Security |
| **RunPod** | Provider GPU cloud haute performance |
| **SSE** | Server-Side Encryption |
| **TDE** | Transparent Data Encryption |
| **Vast.ai** | Marketplace GPU décentralisé économique |
| **WAL** | Write-Ahead Logging |

### B. Références

- [Odoo 19 Documentation](https://www.odoo.com/documentation/19.0/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MinIO Documentation](https://docs.min.io/)
- [Flutter Documentation](https://docs.flutter.dev/)
- [Whisper Model Card](https://github.com/openai/whisper)
- [RGPD Guidelines](https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on)

### C. Contacts

| Rôle | Contact | Responsabilité |
|------|---------|----------------|
| Product Owner | À définir | Vision produit |
| Tech Lead | À définir | Architecture |
| DevOps Lead | À définir | Infrastructure |
| Security Officer | À définir | Conformité |
| QA Lead | À définir | Qualité |

---

*Document vivant - Dernière mise à jour : Janvier 2025*  
*Version : 3.1.0*  
*Statut : CONSOLIDÉ ET OPTIMISÉ*  
*Changements v3.1 : Odoo Community + GPU Cloud (RunPod/Vast.ai) = -65% coûts*