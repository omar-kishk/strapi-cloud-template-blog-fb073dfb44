# Eraser.io Setup Guide for Cursor IDE

## Installation Steps

Since Cursor IDE is built on VS Code, it supports VS Code extensions. Follow these steps:

### Option 1: Install via Extensions Panel (Recommended)
1. Open Cursor IDE
2. Press `Ctrl+Shift+X` to open the Extensions panel
3. Search for: **Eraser Diagrams**
4. Look for the extension by **EraserLabs**
5. Click **Install**

### Option 2: Install via Quick Open
1. Press `Ctrl+P` to open Quick Open
2. Type: `ext install EraserLabs.eraserlabs`
3. Press Enter

## Sample Diagrams Created

I've created 4 example diagram files in your workspace to help you get started:

### 1. [example-flowchart.eraserdiagram](example-flowchart.eraserdiagram)
- Demonstrates process flows with decision points
- Shows how to use shapes, icons, and colors
- Example: User input validation flow

### 2. [example-sequence.eraserdiagram](example-sequence.eraserdiagram)
- Shows interactions between components over time
- Example: User authentication sequence with JWT

### 3. [example-cloud-architecture.eraserdiagram](example-cloud-architecture.eraserdiagram)
- Demonstrates system architecture diagrams
- Shows load balancing, servers, databases, and external services
- Example: Web application architecture

### 4. [example-erd.eraserdiagram](example-erd.eraserdiagram)
- Entity Relationship Diagram for database design
- Shows tables, columns, data types, and relationships
- Example: E-commerce database schema

## How to Use

1. **After installing the extension**, open any `.eraserdiagram` file
2. The diagram preview will appear automatically
3. Click the **Edit** button to view/modify the code
4. Make changes to see live updates in the preview

## Diagram Types Supported

Specify the diagram type on the first line:
- `flowchart` - Process flows and decision trees
- `sequence-diagram` - Component interactions over time
- `cloud-architecture-diagram` - System architecture
- `entity-relationship-diagram` - Database schemas

## Quick Syntax Reference

### Common Elements
- **Nodes**: `NodeName [label: "Display Text", icon: icon-name, color: blue]`
- **Connections**: `NodeA > NodeB` or `NodeA > NodeB: Label`
- **Icons**: user, server, database, lock, mail, cpu, check, etc.
- **Shapes**: oval, diamond, rectangle (default)
- **Colors**: blue, green, red, purple, orange, yellow, or hex codes

### ERD Specific
- **Tables**: `TableName { column_name type constraints }`
- **Keys**: PK (Primary Key), FK (Foreign Key)
- **Relationships**: `Table1 1--* Table2` (one-to-many)

## Next Steps

1. Install the extension using the steps above
2. Open any of the example `.eraserdiagram` files
3. Experiment by modifying the code
4. Create your own diagrams for your projects!

## Resources

- [Official Documentation](https://docs.eraser.io/docs/diagram-as-code)
- [VS Code Extension Guide](https://docs.eraser.io/docs/using-the-vs-code-extension)
- [Eraser.io Website](https://www.eraser.io/)

## Tips

- 💡 Diagrams are version-controlled just like code
- 💡 Use comments with `//` to document your diagrams
- 💡 Changes are instant - edit code and see updates immediately
- 💡 Perfect for technical documentation in your README files
