## 🟢 Round Type 1: Live Coding (60 Minutes)
*This is the "Machine Coding" or "Algorithmic" round. You will face **ONE** of these two main scenarios. They focus on implementing business logic, class design, and handling data streams.*

**Question 1: The "Agent Assignment" System**
*   **The Prompt:** Implement a class/system to assign tasks (chats) to support agents.
*   **The Rules:**
    1.  **Capacity:** Agents can handle a max of `X` concurrent chats.
    2.  **Selection Logic:** Assign to the agent with the **lowest load**.
    3.  **Tie-Breaker:** If loads are equal, assign to the agent who has been free/waiting the **longest** (oldest `last_assigned_timestamp`).
    4.  **The "Senior" Requirement (Crucial):** Implement `previewAssignments(n)`.
        *   *Specific Wording from your source:* "Generate a list of the next available agents for further assignments, covering the next N tasks."
        *   *Constraint:* This function must return the names of the agents who *would* get the tasks **without** actually assigning them or modifying the database/state.

**Question 2: Log Histogram / Transaction Grouping**
*   **The Prompt:** You are given a stream of log data (timestamps, user_ids, action_types). You need to write a function that returns a histogram of counts grouped by a specific time granularity (Minute, Hour, or Day).
*   **Equivalent LeetCode:** **Tweet Counts Per Frequency (LC 1348)**.
*   **The Logic:**
    1.  Ingest unsorted logs.
    2.  Given a `startTime`, `endTime`, and `frequency` (e.g., "5 minutes"), bucket the logs.
    3.  *Formula:* `bucket_index = floor((log_time - start_time) / interval_seconds)`.
    4.  Return the count of events in each bucket.

**Question 3: Flatten Nested Objects / JSON**
*   **Source:** Verified "Intercom" tagged question, commonly asked at PE III level.
*   **The Prompt:** Given deeply nested data (objects and/or arrays), flatten it. For objects, use dot notation (`user.profile.name`). For mixed structures, include array indices (`items.0.name`).
*   **Examples:**
    *   Object: `{ user: { name: "Alice", age: 30 } }` → `{ "user.name": "Alice", "user.age": 30 }`
    *   Mixed: `{ users: [{ name: "Bob" }] }` → `{ "users.0.name": "Bob" }`
*   **Relevance:** **THIS IS THE MOST INTERCOM-SPECIFIC PROBLEM.** Their entire platform is built around:
    *   User custom attributes (deeply nested company data, preferences)
    *   Event metadata (product purchases, page views with nested properties)
    *   Conversation data (messages arrays with participant objects)
    *   API responses that need flattening for analytics/storage
*   **What to implement:**
    1. `flattenMixed(data)` - Handles both objects and arrays (CODE THIS FIRST)
    2. `flattenObject(obj)` - Objects only with dot notation
    3. `unflattenObject(flat)` - Reverse operation (shows system design thinking)
    4. Bonus: Options for bracket notation `users[0].name`, max depth limits

---

### 🔵 Round Type 2: "Minicom" (120 Minutes)
*The "Mini-Intercom" Project. You are given a repo with a skeleton and must connect the parts.*

**Question 4: The Task: Two-Way Messenger (User <-> Admin)**
*   **The Setup:**
    *   **Process 1:** Customer Client (Webpage).
    *   **Process 2:** Agent/Admin Dashboard (Webpage).
    *   **Process 3:** API Server (Node/Express).
*   **Requirements:**
    1.  **Bridge the Gap:** When a User types in Client A, it sends a POST to the Server, which stores it. Client B needs to display it.
    2.  **Two-Way:** The Agent must be able to reply from Client B, appearing on Client A.
    3.  **Constraints:** You might be restricted to Vanilla JS/jQuery for the frontend (per Source E), or allowed React. Be ready for Vanilla JS DOM manipulation (`document.createElement('div')`).
*   **The "Senior" Add-ons:**
    *   **Typing Indicators:** "User is typing..." appears on the Agent screen.
    *   **Read Receipts:** "Seen by Agent".
    *   **Conversation State:** Closing a chat prevents further messages.

---

### 🟣 Round Type 3: System Design (60 Minutes)
*This is often called "Product Architecture." It focuses on Schema Design (ER Diagrams) rather than distributed scaling.*

**Question 5: Design the Intercom Data Model**
*   **Source:** Your Source G ("Design a database object model... users messaging admins") & Source F ("ER diagrams, normalization").
*   **The Prompt:** Design the database schema for a messaging app.
*   **Key Entities to Model:**
    *   **Users:** (Customers).
    *   **Admins:** (Support Agents).
    *   **Conversations:** The container for messages.
    *   **Messages:** The actual text content.
    *   **Conversation_Parts:** (Intercom specific term) - How do you model "User opened chat", "Admin assigned to chat", "Admin closed chat"? These are events in the conversation timeline.
*   **Key Decision:** How do you link Users and Admins to a Message? (Polymorphic association vs. Single Table).

**Question 6: Notification System Schema**
*   **Source:** Your Source A ("Data structure for some Intercom features like notifications").
*   **The Prompt:** Design the model for a "Campaign" (Outbound message).
*   **Key Entities:**
    *   **Segment:** "Users who signed up 7 days ago."
    *   **Message_Template:** "Hey {name}, come back!"
    *   **Campaign_Job:** The actual execution.
    *   **Delivery_Status:** Sent, Opened, Clicked.

---

### Algorithmic Warmups

7.  **Group Anagrams:** "Given array of strings, return array where anagram strings are adjacent."
8.  **Longest Substring Without Repeating Characters:** Sliding window basics.
9.  **Factorial / Recursion Basics:** Simple logic checks.
10.  **Two Sum:** The absolute baseline.