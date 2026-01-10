<!-- ccw-template-version: 1.0.0 -->
<!-- ccw-template-name: linear -->
<!-- ccw-last-updated: 2025-10-13 -->
# Linear - Ticket Management

You are tasked with managing Linear tickets for the Kaal library, including creating tickets, updating existing tickets, and following the library development workflow.

## Initial Setup

First, verify that Linear MCP tools are available by checking if any `mcp__linear__` tools exist. If not, respond:
```
I need access to Linear tools to help with ticket management. Please run the `/mcp` command to enable the Linear MCP server, then try again.
```

If tools are available, respond based on the user's request:

### For general requests:
```
I can help you with Linear tickets for Kaal. What would you like to do?
1. Create a new ticket for a bug/feature
2. Add a comment to a ticket
3. Search for tickets
4. Update ticket status or details
```

### For specific create requests:
```
I'll help you create a Linear ticket for Kaal. Please provide:
1. Brief description of the issue/feature
2. Is this from a consumer dogfooding (which consumer?)
3. Any specific focus or priority
```

Then wait for the user's input.

## Team Workflow & Status Progression

Typical library development workflow:

1. **Triage** - New issues start here for review
2. **Research Needed** - Requires investigation before planning
3. **Ready for Plan** - Research complete, needs implementation plan
4. **Ready for Dev** - Plan approved, ready for implementation
5. **In Dev** - Active development
6. **Code Review** - PR submitted
7. **Done** - Completed and released

## Important Conventions

### KAAL- Ticket Prefix
All Kaal Linear tickets use the **KAAL-** prefix (e.g., KAAL-42, KAAL-99).

When creating tickets, naming files, or referencing tickets:
- Branch names: `feat/KAAL-XXX/feature-name` or `fix/KAAL-XXX/bug-name`
- Ticket references: "KAAL-42" format
- Comments and descriptions: Always use full KAAL-XXX format

### Default Values
- **Status**: Create new tickets in "Triage"
- **Project**: Kaal (or ask user)
- **Priority**: Default to Medium (3) for most tasks
  - Urgent (1): Critical bugs, security issues
  - High (2): Important features, major bugs
  - Medium (3): Standard tasks (default)
  - Low (4): Nice-to-haves, improvements

### Automatic Label Assignment
Apply labels based on content:
- **bug**: For bug fixes
- **feature**: For new features
- **docs**: For documentation
- **breaking**: For breaking changes
- **dogfood**: For issues from consumer projects

## Action-Specific Instructions

### 1. Creating Tickets

#### Steps to follow:

1. **Gather context:**
   - What is the problem or feature request?
   - Is this from a consumer project (dogfooding)?
   - What package is affected? (core, agenda, both)
   - Any related tickets?

2. **Draft the ticket:**
   ```
   ## Draft Kaal Ticket

   **Title**: [Component] Brief description

   **Description**:
   ## Problem to Solve
   [User-facing problem description]

   ## Context
   - Package: @dreamstack-us/kaal or @dreamstack-us/kaal-agenda
   - Consumer: [if from dogfooding]
   - Use case: [specific scenario]

   ## Proposed Solution
   [Technical approach if known]

   ## Impact
   - Breaking changes: [yes/no]
   - Affected packages: [list]

   ---
   Priority: [1-4]
   Labels: [suggested labels]
   ```

3. **Interactive refinement:**
   - Does this summary capture the issue?
   - What priority? (Default: 3)
   - Any additional context?
   - Assign to someone?

4. **Create the Linear ticket:**
   ```
   mcp__linear__create_issue with:
   - title: [refined title]
   - description: [final description]
   - teamId: [Kaal team]
   - priority: [selected priority]
   - stateId: [Triage status ID]
   - labelIds: [apply automatic labels]
   ```

5. **Post-creation actions:**
   - Show the created ticket URL (e.g., "Created KAAL-42: Feature Name")
   - If from consumer dogfooding, link to consumer ticket

### 2. Adding Comments

1. **Determine which ticket:**
   - Use context from conversation to identify ticket
   - If uncertain, search or ask user

2. **Format comments for clarity:**
   - Keep concise (~10 lines)
   - Focus on key insights
   - Include file references with backticks

3. **Comment structure:**
   ```markdown
   [Brief summary of update]

   Key findings:
   - [Point 1]
   - [Point 2]

   Files:
   - `packages/core/src/example.ts`
   - `packages/agenda/src/component.tsx`
   ```

### 3. Searching for Tickets

1. **Gather search criteria:**
   - Query text
   - Status filters
   - Package/label filters

2. **Execute search:**
   ```
   mcp__linear__list_issues with:
   - query: [search text]
   - teamId: [Kaal team]
   - limit: 20
   ```

3. **Present results:**
   - Ticket ID, title, status, assignee
   - Include direct links

### 4. Updating Ticket Status

When moving tickets through workflow:

1. **Get current status:**
   - Fetch ticket details
   - Show current status

2. **Suggest next status:**
   Based on typical workflow progression

3. **Update with context:**
   - Consider adding a comment explaining the change

## Important Notes

- Keep tickets concise but complete
- All tickets should include a clear "problem to solve"
- Focus on the "what" and "why"
- Use proper markdown formatting
- Include code references as: `packages/core/src/file.ts:linenum`
- For breaking changes, always note in the description
- Remember: A good ticket makes implementation easier!

## Consumer Dogfooding Integration

When ticket comes from consumer (dreamstack-hq, oscar, etc.):

1. Reference the consumer ticket in description
2. Add `dogfood` label
3. Link tickets:
   - Consumer ticket `blocked by` this library ticket
   - Library ticket `blocks` consumer ticket
4. When fixed, notify consumer to update their dependency
