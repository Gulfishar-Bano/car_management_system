
import { Injectable } from '@nestjs/common';
import { HfInference } from '@huggingface/inference';

@Injectable()
export class AiService {
  private hf = new HfInference(process.env.APP_HUGGINGFACE_TOKEN);

 
async askAi(message: string) {
  try {
    const response = await this.hf.chatCompletion({
      model: "meta-llama/Llama-3.2-1B-Instruct", 
      messages: [
        { role: "user", content: message } 
      ],
      max_tokens: 100,
    });

    return response.choices[0].message.content;
  } catch (error) {
   
    if (error.httpResponse && error.httpResponse.body) {
       console.error('Hugging Face Detailed Error:', error.httpResponse.body);
    } else {
       console.error('Hugging Face Error:', error.message);
    }
    throw new Error('AI Service is currently unavailable');
  }
}


}