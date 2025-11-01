# How I Rewrote Our Enterprise Self-Care Platform in Rust — and Finished a Full AI-Assisted Data Fix in a Single Day

*January 2025 · Rust · AI-Assisted Development · Enterprise · Iced GUI · PostgreSQL · Data Engineering*

When people hear "complete rewrite", they think of endless migration meetings and sleepless nights. But with the right mindset — and a few good AIs — a rewrite can become a masterpiece.

---

## 🧩 Background: When Python Hit Its Limits

Our EUS Self-Care client originally used Python + PySide6. It worked… until it didn't. Performance degraded as thousands of users across MTN Irancell depended on it daily for device troubleshooting, printer setup, network checks, and voice diagnostics.

### The Core Problem

The culprit was multifaceted:

- **Single-threaded GIL contention:** Running multiple concurrent device diagnostics (SNMP queries, SSH commands, HTTP health checks) serialized behind Python's Global Interpreter Lock, causing UI freezes and timeouts.
- **Memory overhead:** Each PySide6 window spun up its own Python interpreter context. With 50+ concurrent users, this ballooned to ~500MB per instance.
- **Startup latency:** The legacy monolith took 8-12 seconds to bootstrap due to PySide6 initialization and lazy imports.
- **Type safety gaps:** Dynamic typing masked bugs that only surfaced in production. A simple typo in dictionary keys could crash the entire session.

By year two, we were patching symptoms instead of addressing root causes. Network timeouts were more frequent, memory leaks were creeping in, and adding new device types required careful refactoring to avoid breaking existing features.

So I decided to rewrite everything in Rust using Iced GUI — a bold but necessary move. The goals were clear:
- **Sub-second startup** via static compilation
- **True parallelism** for concurrent device diagnostics
- **Memory efficiency** under 50MB per instance
- **Type-safe APIs** eliminating entire categories of runtime errors

---

## ⚙️ The Rewrite Architecture

**🕐 Timeline:** less than three months

**💻 Platforms:** Linux first, then Windows parity in under two months

**🚀 Results:** 100× faster imports, smaller memory footprint, single static binaries, sub-100ms startup

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Iced GUI (Desktop App)                      │
│  - Message passing for all state changes                     │
│  - Async task spawning for blocking operations               │
│  - Single-threaded UI, multi-threaded backend                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Async Runtime (Tokio)                           │
│  - Device diagnostics (parallel SSH/SNMP/HTTP)              │
│  - Database connection pooling (sqlx)                        │
│  - CSV import worker threads                                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
    ┌─────────┐  ┌──────────┐  ┌────────────┐
    │PostgreSQL│  │SSH Daemon│  │Device APIs │
    └─────────┘  └──────────┘  └────────────┘
```

By month two, we had Windows support (802.1x checks, printer commands, voice diagnostics) fully functional.

---

## 🤖 My Co-Developer: AI

I didn't do this alone. My real pair programmers were GPT-5 Codex, Claude, and Cursor. They didn't just generate code — they reasoned through errors, improved logic, and built safe automation.

### The AI Stack

**🧠 GPT-5 Codex:** 
- Excellent Rust reasoning with deep borrow checker understanding
- Generated async/await patterns that minimized cloning
- Optimized database query batching for large datasets
- Suggested performance improvements (e.g., using `Arc<DashMap>` for concurrent device caches)

**⚙️ Cursor:** 
- Perfect for editing and committing directly to Git
- Its "cloud run" feature created branches and tested changes automatically
- Integrated debugging when I hit platform-specific issues

**💬 Composer v1:** 
- Lightweight and fast for smaller snippets
- Great for quick refactorings and boilerplate generation

**💡 Claude 4.5 Haiku & Sonnet:** 
- Excellent for architecture brainstorming
- Beautiful documentation and design patterns

**Why Claude Dominates Coding AI**

When it comes to production-grade code generation, Claude stands in a category of its own. I've tested Copilot, Warp, and other alternatives extensively — and they're not even close.

*Copilot excels at autocomplete.* It's fast, integrated into every editor, and decent at generating boilerplate. But ask it to reason through a complex data structure, debug a borrow checker error, or design a multi-layer ETL pipeline? It hallucinates, generates unsafe patterns, and often needs multiple corrections.

*Warp and terminal assistants* are useful for shell commands, but they lack the context awareness needed for architectural decisions. They're tactical tools, not strategic partners.

*Claude, on the other hand, is built differently.* It reasons about:
- **Rust's type system:** Not just generating code that compiles, but generating code that's safe and idiomatic. When I asked Claude to fix borrow checker issues, it understood ownership semantics deeply—suggesting `Arc<DashMap>` instead of `Mutex<HashMap>` for concurrent scenarios.
- **Database query optimization:** It doesn't just write SQL; it explains trade-offs. When I asked about deduplication strategies, Claude generated both the preview and deletion phases, with rollback safeguards—something most AI models would skip.
- **Error handling patterns:** Custom error types, proper error propagation, recovery logic. Claude understands that production code isn't about making it work; it's about making it fail gracefully.
- **Architectural reasoning:** The design patterns Claude suggested weren't just functional—they were forward-compatible. Using `Message` enums in Iced, connection pooling strategies, transaction isolation—these weren't random; they reflected deep understanding of distributed systems.

**The Productivity Multiplier**

Here's the honest ROI calculation:

- **Without Claude:** A senior Rust developer writing this rewrite solo would take ~4-6 weeks. At $200/hour (fully-loaded cost), that's $40K-$60K.
- **With Claude:** Same project, 3 weeks (even with learning Iced). Cost: ~$50/month for Pro, so ~$150 total. Productivity boost: **80-90%**.

In one month, Claude paid for itself 300× over. That's not hype; that's math.

**Why Developers Consistently Choose Claude**

I've watched the community converge on Claude for serious work:

1. **Token efficiency:** Claude's longer context window (200K tokens) means I can paste entire codebases and ask "how would you refactor this module?" Other models require copying snippets in isolation.

2. **No hallucinations on known APIs:** When I ask Claude about `sqlx` macros or Iced's `Command::perform`, it gives accurate answers. GPT-4 sometimes invents function signatures that don't exist.

3. **Honest about limitations:** When Claude doesn't know something, it says so. Other models confidently give wrong answers. For production code, that's critical.

4. **Multi-turn reasoning:** I don't need to re-explain context every turn. Claude tracks my project's constraints, the problem I'm solving, and the patterns I prefer. Over a long session, this feels like pair programming with someone who *actually understands your codebase*.

5. **Code review quality:** Claude catches bugs I miss. When I asked it to review the manager-linking logic, it spotted a race condition in the original DashMap implementation that I'd overlooked.

**Fair Pricing, Unfair Returns**

$20/month for Claude Pro feels absurdly cheap when you consider the alternative:

- **Hiring another junior developer:** $50K/year ($2,400/month)
- **Outsourcing code review:** $100-300/hour
- **Training time on new frameworks:** 40-60 hours for a senior dev to master Iced

Claude at $240/year competes with *all of that*. The pricing isn't aggressive; it's almost under-valued.

For teams, it gets even better. One Claude subscription replaces:
- GitHub Copilot ($10/month) — with vastly better reasoning
- AWS CodeWhisperer ($2-10/month) — inferior on complex tasks
- Internal documentation time — Claude reads your codebase faster than anyone
- Junior developer code quality — Claude's code requires fewer revisions

**The King of Coding AI**

I've talked to dozens of developers who've tried everything. The consensus is unanimous: Claude is the king of coding AI, and the gap is huge. It's not incremental better; it's categorically different.

Why? Because Anthropic focused on reasoning and safety from day one. Most AI models optimize for speed or scale. Claude optimizes for *correctness and depth*. For coding, that's the only metric that matters.

The moment I stopped treating Claude as "smart autocomplete" and started treating it as "my pair programmer," everything changed. Rewrite speed doubled. Code quality improved. Bugs found themselves before production.

If you're a serious developer and not using Claude for coding, you're leaving 3-6 months of productivity on the table every year. That's not a marginal improvement; that's transformational.

> "AI doesn't just autocomplete — it collaborates."

The workflow became: sketch the problem → AI generates pattern → I refine → test → merge. For a senior developer, this isn't autocomplete; it's a co-reasoner.

---

## 🦀 Full Rust Import System: Building a Production ETL

The importer module became a miniature ETL system: it cleans old data, loads CSVs, validates columns, links managers, and updates PostgreSQL efficiently using sqlx.

### Performance Context

In PHP (Laravel), the same import command took 15+ minutes for 50,000+ records. Rust finished in under two minutes. Here's why:

**Python/PHP approach:**
- ORM overhead: each row instantiation created object allocations
- N+1 queries: fetching manager lookups one-by-one
- Serialization: converting between database types multiple times

**Rust approach:**
- Batch inserts with `COPY` for 1000-row chunks
- Pre-loaded manager mappings into a `DashMap` (lock-free concurrent hashmap)
- Type safety eliminating parsing errors at compile time
- Zero-copy CSV parsing with `csv` crate

### Import Data Flow

```
CSV File
   │
   ├─> Validation Layer (column types, required fields)
   │   └─> Type-safe structs (serde + custom deserializers)
   │
   ├─> Data Cleaning Pipeline
   │   ├─> Deduplicate (see SQL below)
   │   ├─> Normalize names/fields
   │   └─> Link managers from cache
   │
   ├─> Batch Accumulator (1000 rows)
   │   └─> COPY INTO PostgreSQL
   │
   └─> Transaction Management
       ├─> Rollback on any error
       └─> Log all changes
```

### Example: Type-Safe CSV Parsing

The old system trusted CSV headers. If a column name changed, the entire job failed silently. Here's the Rust approach:

```rust
#[derive(Debug, Deserialize)]
struct StaffAssetRecord {
    #[serde(rename = "Device Name")]
    name: String,
    
    #[serde(rename = "Serial Number")]
    serial_number: String,
    
    #[serde(rename = "Username")]
    username: Option<String>,
    
    #[serde(rename = "Device Type")]
    device_type: String,
    
    #[serde(rename = "Description")]
    description: Option<String>,
}

// Serde enforces that all required fields exist at parse time.
// Missing a required field? Compiler error.
// Type mismatch? Deserialization fails with clear feedback.
```

### Batch Insert Pattern with sqlx

```rust
async fn import_assets(
    pool: &PgPool,
    records: Vec<StaffAssetRecord>,
    manager_cache: &DashMap<String, String>,
) -> Result<u64, ImportError> {
    // Pre-allocate for performance
    let mut values = String::with_capacity(records.len() * 50);
    let mut params: Vec<String> = Vec::new();
    
    for (idx, record) in records.iter().enumerate() {
        let manager_name = manager_cache
            .get(record.username.as_deref().unwrap_or(""))
            .map(|v| v.clone());
        
        let offset = idx * 5;
        values.push_str(&format!(
            "(${},${},${},${},${}),",
            offset + 1, offset + 2, offset + 3, offset + 4, offset + 5
        ));
        
        params.push(record.name.clone());
        params.push(record.serial_number.clone());
        params.push(record.device_type.clone());
        params.push(record.description.clone().unwrap_or_default());
        params.push(manager_name.unwrap_or_default());
    }
    
    // Remove trailing comma
    values.pop();
    
    let query = format!(
        "INSERT INTO staff_assets (name, serial_number, device_type, description, manager_name) 
         VALUES {} ON CONFLICT (serial_number) DO UPDATE SET 
         name = EXCLUDED.name, device_type = EXCLUDED.device_type",
        values
    );
    
    let mut query_builder = sqlx::query(&query);
    for param in params {
        query_builder = query_builder.bind(param);
    }
    
    let result = query_builder.execute(pool).await?;
    Ok(result.rows_affected())
}
```

### SQL Cleanup: Deduplication Strategy

After importing years of data, duplicates accumulated. Here's the safe two-phase approach:

**Phase 1: Preview Duplicates**

```sql
WITH ranked AS (
  SELECT id,
         ROW_NUMBER() OVER (
           PARTITION BY name,
                        COALESCE(username, ''),
                        COALESCE(type, ''),
                        COALESCE(description, '')
           ORDER BY created_at
         ) AS rn
  FROM staff_assets
  WHERE serial_number LIKE 'TAG-%'
)
SELECT name,
       COALESCE(username, '') AS username,
       COALESCE(type, '')     AS type,
       COALESCE(description, '') AS description,
       COUNT(*) AS dup_count,
       ARRAY_AGG(id ORDER BY created_at) AS ids
FROM ranked
WHERE rn > 1
GROUP BY name, COALESCE(username, ''), COALESCE(type, ''), COALESCE(description, '')
ORDER BY dup_count DESC;
```

This shows exactly what would be deleted—critical for auditing. We kept the earliest record (by `created_at`) and discarded younger duplicates.

**Phase 2: Safe Deletion with Backup**

```sql
-- Create backup before deletion
CREATE TABLE staff_assets_backup_2025_01_15 AS 
  SELECT * FROM staff_assets WHERE serial_number LIKE 'TAG-%';

-- Delete duplicates (keeping only the first occurrence)
WITH ranked AS (
  SELECT id,
         ROW_NUMBER() OVER (
           PARTITION BY name,
                        COALESCE(username, ''),
                        COALESCE(type, ''),
                        COALESCE(description, '')
           ORDER BY created_at
         ) AS rn
  FROM staff_assets
  WHERE serial_number LIKE 'TAG-%'
)
DELETE FROM staff_assets
WHERE id IN (SELECT id FROM ranked WHERE rn > 1);

-- Verify
SELECT COUNT(*) FROM staff_assets; -- Should be significantly lower
```

This conservative approach ensured we could rollback if reporting logic broke.

---

## 🧩 Automatic Manager Linking: Smart Data Inference

In the old Laravel version, accessories didn't have manager names, so reporting hierarchies were incomplete. The Rust importer solved this beautifully:

### The Algorithm

When importing assets and accessories in sequence:

1. **Asset Pass:** For each asset with a username, store `(username → manager_name)` in an in-memory `DashMap`:
   ```rust
   manager_mapping.insert(
       asset.username.clone(),
       asset.manager_name.clone()
   );
   ```

2. **Accessory Pass:** When importing accessories, look up each user's manager:
   ```rust
   let manager_name = manager_mapping
       .get(accessory.username.as_deref().unwrap_or(""))
       .map(|entry| entry.clone());
   ```

**🧠 The data taught itself.**

That tiny detail eliminated one of the biggest gaps in the system — no more manual lookups in Excel. It also created an audit trail: if an accessory was assigned to the wrong manager, we could trace it back to the asset data at import time.

### Why DashMap?

In high-throughput scenarios, a traditional `HashMap` behind a `Mutex` becomes a bottleneck. `DashMap` uses lock-free shard-based concurrency:

```rust
use dashmap::DashMap;

// Multiple threads can read/write different shards simultaneously
let mapping = Arc::new(DashMap::new());

// Safe across threads without explicit locking
mapping.insert(key, value);
let value = mapping.get(&key).map(|v| v.clone());
```

For the import system, this meant we could spawn parallel CSV reader tasks without contention on the manager cache.

---

## 🧠 Today's Fix — AI, Cursor, and Codex in Action

Today was one of those "everything clicks" days. We had a real business issue: managers (vendor staff) couldn't see the accessories and assets of the users they manage. Accessories lacked the `manager_name` field in the database layer, so the filtering logic didn't work.

### The Problem Deep Dive

The backend exposed this endpoint:

```rust
#[get("/api/managed_users")]
async fn get_managed_users(
    user: UserJWT,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse> {
    // BUG: This query only checked staff_assets.manager_name
    // Accessories didn't have manager_name, so they were never filtered
    let users = sqlx::query_as::<_, UserId>(
        "SELECT DISTINCT username FROM staff_assets 
         WHERE manager_name = $1"
    )
    .bind(&user.username)
    .fetch_all(pool.get_ref())
    .await?;
    
    Ok(HttpResponse::Ok().json(users))
}
```

Then in the frontend, we'd fetch accessories:

```rust
let accessories = sqlx::query_as::<_, Accessory>(
    "SELECT * FROM accessories WHERE username = ANY($1)"
)
.bind(&user_ids)
.fetch_all(pool.get_ref())
.await?;
```

But since `accessories` table had no `manager_name` column, the join failed silently, and managers saw nothing.

### The Solution Architecture

Instead of patching blindly, I:

1. **Extended the Rust Importer Logic** (using Codex in Cursor):

```rust
async fn import_accessories(
    pool: &PgPool,
    records: Vec<AccessoryRecord>,
    manager_cache: &Arc<DashMap<String, String>>,
) -> Result<u64, ImportError> {
    for record in records {
        // NEW: Enrich accessories with manager data
        let manager_name = manager_cache
            .get(record.username.as_deref().unwrap_or(""))
            .as_ref()
            .map(|entry| entry.value().clone());
        
        sqlx::query(
            "INSERT INTO accessories 
             (name, username, serial_number, manager_name, created_at) 
             VALUES ($1, $2, $3, $4, NOW())"
        )
        .bind(&record.name)
        .bind(&record.username)
        .bind(&record.serial_number)
        .bind(manager_name) // Populated from asset mapping
        .execute(pool)
        .await?;
    }
    Ok(())
}
```

2. **Added a New Backend Endpoint** (Laravel, but same logic):

```php
Route::get('/api/managed-users/{type}', function (Request $request, $type) {
    $user = Auth::user();
    
    // $type: 'assets' | 'accessories' | 'all'
    $table = $type === 'accessories' ? 'accessories' : 'staff_assets';
    
    if ($user->is_manager) {
        // Managers see all users they manage
        return DB::table($table)
            ->where('manager_name', $user->username)
            ->distinct('username')
            ->get(['username']);
    }
    
    // Regular users see only themselves
    return collect([['username' => $user->username]]);
})->middleware('auth:sanctum');
```

3. **Ran Tests and Discovered Duplicates:**

Running the import on test data, I noticed `UNIQUE` constraint violations. Same serial numbers, different manager names. Used GPT-5 to generate the preview query (shown earlier), identified ~8,000 duplicates.

4. **During Testing, I Lost DB Credentials** 😅:

Environment variables weren't in the usual place. Instead of manually hunting, I asked Claude to:
- Scan `.env`, `.env.production`, `.env.local`
- Generate a backup script
- Generate a restore script

```bash
#!/bin/bash
# Generated by Claude
BACKUP_DIR="/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" > "$BACKUP_DIR/full.sql"
pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" --format=custom > "$BACKUP_DIR/full.dump"

echo "✅ Backup complete: $BACKUP_DIR"
```

5. **Fixed a Windows Activation Bug** from Cursor's cloud environment:

The issue: SSH credentials on Windows were stored in `%APPDATA%\openssh\keys` but we were looking in `~\.ssh\id_rsa`. Cursor created a branch, ran tests, and asked for approval before merging.

```rust
#[cfg(target_os = "windows")]
fn get_ssh_key_path() -> PathBuf {
    let appdata = std::env::var("APPDATA")
        .unwrap_or_else(|_| String::from("."));
    PathBuf::from(appdata)
        .join("openssh")
        .join("keys")
        .join("id_rsa")
}

#[cfg(not(target_os = "windows"))]
fn get_ssh_key_path() -> PathBuf {
    dirs::home_dir()
        .unwrap_or_default()
        .join(".ssh")
        .join("id_rsa")
}
```

> "One day, one session, one AI-powered workflow — and everything worked."

---

## 🔒 Production Architecture & Safety

### Transaction Isolation

For the data fix, we used PostgreSQL transactions:

```rust
let mut tx = pool.begin().await?;

// Phase 1: Create backup
sqlx::query(
    "CREATE TEMP TABLE backup_accessories AS SELECT * FROM accessories"
)
.execute(&mut *tx)
.await?;

// Phase 2: Add manager_name column if missing
sqlx::query(
    "ALTER TABLE accessories ADD COLUMN manager_name TEXT"
)
.execute(&mut *tx)
.await?;

// Phase 3: Populate manager_name
sqlx::query(
    "UPDATE accessories a SET manager_name = am.manager_name
     FROM asset_manager_mapping am 
     WHERE a.username = am.username"
)
.execute(&mut *tx)
.await?;

// Only commit if all phases succeed
tx.commit().await?;
```

If any step failed, the entire transaction rolled back automatically.

### Error Handling Strategy

Custom error type for domain-specific errors:

```rust
#[derive(Debug)]
pub enum ImportError {
    Csv(csv::Error),
    Database(sqlx::Error),
    MissingField(String),
    InvalidData { row: usize, reason: String },
    Io(std::io::Error),
}

impl From<csv::Error> for ImportError {
    fn from(e: csv::Error) -> Self {
        ImportError::Csv(e)
    }
}

// ... similar for other error types

impl Display for ImportError {
    fn fmt(&self, f: &mut Formatter) -> FmtResult {
        match self {
            ImportError::Csv(e) => write!(f, "CSV parsing failed: {}", e),
            ImportError::Database(e) => write!(f, "Database error: {}", e),
            ImportError::MissingField(field) => write!(f, "Required field missing: {}", field),
            ImportError::InvalidData { row, reason } => {
                write!(f, "Row {}: {}", row, reason)
            }
            ImportError::Io(e) => write!(f, "IO error: {}", e),
        }
    }
}
```

Then in the import handler:

```rust
match import_assets(pool, records, &manager_cache).await {
    Ok(count) => info!("Imported {} assets", count),
    Err(ImportError::InvalidData { row, reason }) => {
        // Return to user with specific row information
        eprintln!("Please fix row {}: {}", row, reason);
        return Err(HttpResponse::BadRequest().json(json!({
            "error": reason,
            "row": row
        })));
    }
    Err(e) => {
        // Log full error for debugging
        error!("Import failed: {:?}", e);
        return Err(HttpResponse::InternalServerError().finish());
    }
}
```

### Connection Pooling

Using `sqlx` with a configured pool:

```rust
let pool = PgPoolOptions::new()
    .max_connections(20)
    .min_connections(5)
    .acquire_timeout(Duration::from_secs(10))
    .idle_timeout(Duration::from_secs(600))
    .connect("postgres://user:pass@localhost/db")
    .await?;
```

This ensures:
- At least 5 idle connections ready for queries
- Maximum 20 connections (tuned for 50 concurrent users)
- Timeout after 10 seconds if no connection available
- Cleanup idle connections after 10 minutes

---

## 🎨 Iced GUI: Async Task Management

The desktop app needed to stay responsive during long operations (imports, diagnostics). Iced's message-based architecture made this elegant:

```rust
#[derive(Debug, Clone)]
pub enum Message {
    ImportStarted,
    ImportProgress(usize),
    ImportCompleted(Result<u64, String>),
    RunDiagnostic(DeviceId),
    DiagnosticResult(DeviceId, DiagnosticReport),
}

fn update(&mut self, message: Message) -> Command<Message> {
    match message {
        Message::ImportStarted => {
            self.is_importing = true;
            // Spawn async task
            Command::perform(
                import_from_csv_async(self.csv_path.clone()),
                Message::ImportCompleted
            )
        }
        Message::ImportProgress(count) => {
            self.import_count = count;
            Command::none()
        }
        Message::ImportCompleted(result) => {
            self.is_importing = false;
            match result {
                Ok(count) => self.status = format!("Imported {} records", count),
                Err(e) => self.error = Some(e),
            }
            Command::none()
        }
        _ => Command::none()
    }
}

// Async task spawned from the command
async fn import_from_csv_async(csv_path: String) -> Result<u64, String> {
    // Heavy work doesn't block UI
    match import_assets(csv_path).await {
        Ok(count) => Ok(count),
        Err(e) => Err(e.to_string()),
    }
}
```

---

## 📊 Performance Benchmarks

| Operation | Python/PySide6 | PHP/Laravel | Rust |
|-----------|---|---|---|
| Import 50K records | 15m 32s | 14m 58s | 1m 47s |
| Query 10K accessories | 2.3s | 1.8s | 120ms |
| Deduplication scan | 8s | 7.2s | 340ms |
| Startup time | 8.2s | 4.1s | 85ms |
| Memory (idle, 50 users) | 500MB | 250MB | 48MB |
| Binary size | N/A | N/A | 12MB (static) |

The Rust version wasn't just faster—it was a different category of performance.

---

## 🔧 Why It Works

- **Rust + SQLx:** compile-time type safety eliminates entire classes of bugs; `sqlx::query_as!` macro generates type-safe queries at compile time
- **Batch Operations:** COPY instead of INSERT statements reduced I/O roundtrips by 99%
- **Async Concurrency:** Tokio runtime allowed parallel device diagnostics without blocking
- **Zero-copy Serialization:** `serde` + `bincode` for efficient message passing
- **AI agents:** contextual awareness and precision problem-solving
- **Cursor Cloud:** integrated version control and testing
- **My rules:** backups first, confirm before delete, always preview changes

---

## 🌞 Reflections

I started this journey years ago with a black NeXT cube, typing random commands in a UNIX terminal. Now, I'm running entire enterprise workflows, pairing with AI systems that understand my codebase.

The tools evolved — from keyboards to companions. But the feeling? Still the same excitement I had as a kid watching that NeXT boot for the first time.

What I learned: 
- **Rewriting isn't reckless if you're methodical.** Backups, preview queries, and staged deployments turn risk into opportunity.
- **AI excels at reasoning about types and concurrency patterns.** Let it handle Rust's complexity.
- **Type safety compounds.** The first 50% of the work prevented the second 50% from breaking.
- **Performance isn't optional at scale.** The difference between 15 minutes and 2 minutes matters when you're running this job nightly.

> "AI didn't replace me. It made me faster, safer, and infinitely more creative."

---

*Stack used:* Rust 1.80+, Iced 0.12, PostgreSQL, sqlx, Tokio, Cursor, GPT-5 Codex, Claude 4.5, DashMap, serde, csv crate, Laravel (legacy backend).

*Production Lessons:* Always backup before data migrations. Use transactions. Test deduplication queries on staging. Pair AI with human judgment. Static binaries win on deployment.

