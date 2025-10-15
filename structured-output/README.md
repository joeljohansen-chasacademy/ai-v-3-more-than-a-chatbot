# Structured Outputs with Google Gemini

This project demonstrates different ways to use structured outputs with Google's Gemini AI model. Structured outputs ensure that the AI returns data in a predictable, parseable format that can be easily integrated into your applications.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

3. Run the examples:
```bash
# Run individual examples
npx tsx src/classification.ts
npx tsx src/information-extraction.ts
npx tsx src/using-zod.ts
```

## Examples

### 1. Classification (`classification.ts`)
Demonstrates different types of classification tasks:
- Simple enum classification (instrument types)
- Multi-class classification with confidence scores
- Sentiment analysis with structured output

### 2. Information Extraction (`information-extraction.ts`)
Shows how to extract structured information from unstructured text:
- Extracts composer information from Wikipedia-style text
- Returns structured data with dates, works, and biography
- Demonstrates complex object schemas

### 3. Using Zod (`using-zod.ts`)
Combines Zod schema validation with structured outputs:
- Defines TypeScript types using Zod schemas
- Validates AI responses with runtime type checking
- Shows type-safe data handling

## Key Concepts

### Response MIME Types
- `text/x.enum`: For simple enum responses
- `application/json`: For complex object responses

### Schema Types
- `Type.STRING`: Text responses
- `Type.NUMBER`: Numeric responses
- `Type.OBJECT`: Complex objects with properties
- `Type.ARRAY`: Lists of items

### Benefits of Structured Outputs
1. **Predictable Format**: Always get data in the expected structure
2. **Type Safety**: Easier to integrate with TypeScript
3. **Validation**: Can validate responses against schemas
4. **Error Handling**: Clear errors when responses don't match expected format
5. **Integration**: Easy to work with databases, APIs, and other systems

## Running the Examples

Each example is self-contained and can be run independently. They demonstrate different aspects of structured outputs:

- Start with `classification.ts` for basic concepts
- Move to `information-extraction.ts` for complex data extraction
- Finish with `using-zod.ts` for advanced type safety and validation
