import { Scraper } from 'agent-twitter-client';
import dotenv from 'dotenv';
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';

dotenv.config();

const rl = readline.createInterface({ input, output });

async function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  try {
    console.log('Initializing Grok Chat Demo...');
    
    const scraper = new Scraper();
    
    // Login to Twitter
    console.log('Logging in to Twitter...');
    await scraper.login(process.env.TWITTER_USERNAME, process.env.TWITTER_PASSWORD);
    
    console.log('\nWelcome to Grok Chat! Type your messages and press Enter. Type "exit" to quit.\n');
    
    let conversationId = null;
    let messages = [];
    
    while (true) {
      const userInput = await prompt('> ');
      
      if (userInput.toLowerCase() === 'exit') {
        break;
      }
      
      try {
        // Add user message to history
        messages.push({ role: 'user', content: userInput });

        const response = await scraper.grokChat({
          messages,
          conversationId,
          returnSearchResults: true,
          returnCitations: true
        });
        
        // Store conversation ID for continued chat
        conversationId = response.conversationId;
        
        // Check rate limits
        if (response.rateLimit?.isRateLimited) {
          console.log('\n⚠️ Rate limit warning:', response.rateLimit.message);
          if (response.rateLimit.upsellInfo) {
            console.log('Usage limit:', response.rateLimit.upsellInfo.usageLimit);
            console.log('Quota duration:', response.rateLimit.upsellInfo.quotaDuration);
          }
        }
        
        // Display Grok's response
        console.log('\nGrok:', response.message);
        
        // Display web results if available
        if (response.webResults && response.webResults.length > 0) {
          console.log('\nSources:');
          response.webResults.forEach((result, index) => {
            console.log(`${index + 1}. ${result.title}: ${result.url}`);
          });
        }
        
        console.log(); // Empty line for readability
        
        // Update messages history
        messages = response.messages;
        
      } catch (error) {
        console.error('Error getting response from Grok:', error.message);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

main().catch(console.error); 