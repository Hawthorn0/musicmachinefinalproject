

1. A brief description of what you created, and a link to the project itself (two paragraphs of text)
https://musicmachinefinalproject.onrender.com/
What we made is a physic based music maker, kinda like rube goldberg machine. How it works is you are presented with several options for things you can place onto the sandbox in the middle. The rectangle triangle and circle options all give you blocks of various shapes (as listed). The spawner creates a ball entity every 2 seconds that can interact with the blocks. The killbox deletes entities when they touch it. Finally, select selects blocks to be edited, and remove simply removes all blocks. The things you place and delete on this canvas are saved to the server. 
Editing with the select tool allows you to change various properties inside of blocks. So you can adjust the angle with the angle parameter (woah), the pitch with the pitch parameter (no way), and the instrument with, you guessed it, the instrument parameter. When a ball entity hits the block, it will play the instrument and pitch as selected in this. The default being C2 piano. The currently available instruments are piano and trumpet, with both having pitch options from C2 to C4. 

2. Any additional instructions that might be needed to fully use your project (login information etc.)
No additional instructions are required, its all very intuitive. 

3. An outline of the technologies you used and how you used them.
We used matterjs, howler, and express for the project. Matterjs was used for the physics system, which helped a lot because writing a good physics system takes a lot of time. It handles labeling (tagging) all the blocks, events like when blocks hit other blocks, mouse support with the blocks, and a bunch of other useful stuff. Matterjs was also used to do the graphics for the shapes. Howler was used as the audio engine, which is useful because it handles audio easily and can load it asynchronously. Express was used for the server side stuff so all the blocks can be stored. 

4. What challenges you faced in completing the project.
(Hawthorn) I've never used matterjs and howler before, so while still being relatively new to js learning how to use outside frameworks was a challenge. A difficult part of matter was figuring out how I'd make the blocks store their instrument and pitch, and how to connect those to the wav files I had. After research and looking at matterjs's documentation I found bodies (the shapes) have a bunch of information associated with them, with one such piece of information being the label. So, I just concatenated the instrument and pitch into the label and used that directly as the names of the wav files. Overall just learning all the different parts of matterjs was a challenge, there's a lot to it. Another challenge was getting the sounds to not buffer until a user input has been detected, then just blast your ears. When a sounds played through howler the browser puts a hold onto it until the first time a user shows they're doing stuff on the website, so without it all the sounds will just wait until they all play at once. We weren't able to bypass the browser putting a hold on it, but we did add a start screen which forced user input before the physic part started (I didn't program that part though). The most challenging challenge of all though was making sure everyone did the work for the assignment on time. 

5. What each group member was responsible for designing / developing.
What each group member was responsible for designing / developing.
(Hawthorn) I was responsable for implementing the physics and all the logic that comes with it, the audio logic with it's wav files, and also just being an ideas guy. 

6. A link to your project video.
https://drive.google.com/file/d/1NRwKcaXLsX9n9Zb2t1oxwnFMa7r7cf-3/view?usp=sharing



