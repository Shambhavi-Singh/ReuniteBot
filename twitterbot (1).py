import config
import tweepy
import tweepy
import time
import re
import pickle
import re
from pymongo import MongoClient
#setting up mongodb
client = MongoClient("mongodb+srv://dbUser:kush@cluster0.sxtyg.gcp.mongodb.net/dbUserretryWrites=true&w=majority")
db = client.my_database
tweet1 = db.tweet1

#loading ml model and vectorizer for the data
filename = 'finalized_model.sav'
filename1 = "vectorizer.sav"
loaded_model = pickle.load(open(filename, 'rb'))
loaded_vectorizer = pickle.load(open(filename1,"rb"))

consumer_key= config.consumer_key
consumer_secret= config.consumer_secret
access_token = config.access_token
access_token_secret= config.access_token_secret


#function to clean the data
def clean(data):
    #to account for cant,wont and stuff
    new_data = re.sub(r'\Wt', 't', data)
    # Remove all the special characters
    new_data = re.sub(r'\W', ' ', new_data)

    # remove all single characters
    new_data= re.sub(r'\s+[a-zA-Z]\s+', ' ', new_data)

    # Remove single characters from the start
    new_data = re.sub(r'\^[a-zA-Z]\s+', ' ', new_data) 

    # Substituting multiple spaces with single space
    new_data = re.sub(r'\s+', ' ', new_data, flags=re.I)

    # Removing prefixed 'b'
    new_data = re.sub(r'^b\s+', '', new_data)

    # Converting to Lowercase
    new_data = new_data.lower()

    return new_data

# Access and authorize our Twitter credentials from credentials.py
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

for tweet in tweepy.Cursor(api.search, q=('#missingchild OR #LostChild -filter:retweets'), tweet_mode='extended', lang='en').items(100):
    time.sleep(5)
    
    try:
            
        
            text = tweet.full_text 
            reText = [clean(text)]
            ptext = loaded_vectorizer.transform(reText).toarray()
            prediction = loaded_model.predict(ptext)
            #print(tweet.full_text)
            if(prediction[0]!=2):
                print('\nTweet by: @' + tweet.user.screen_name)
                print(tweet.place)
                # Retweet and like tweets as they are found
                tweet.retweet()
                tweet.favorite()
                print('Retweeted the tweet')
                if tweet.place==None:
                #    #mention and tag only global authorities                    
                    if (prediction[0]==0):
                        api.update_status(status="@ICMEC_official Help Required for Missing Child https://www.twitter.com/"+ tweet.user.screen_name+'/status/' + tweet.id_str)
                    elif(prediction[0]==1):
                        api.update_status(status="@SavetheChildren Help Required for Lost Child https://www.twitter.com/"+ tweet.user.screen_name+'/status/' + tweet.id_str)
                if(tweet.place!=None and tweet.place.country_code=="US" and tweet.place.name=="Indianapolis"):
                    if(prediction[0]==0):
                        api.update_status(status="@IMPDnews Help Required for Missing Child https://www.twitter.com/"+ tweet.user.screen_name+'/status/' + tweet.id_str)
                    elif(prediction[0]==1):
                        api.update_status(status="@SavetheChildren Help Required for Lost Child https://www.twitter.com/"+ tweet.user.screen_name+'/status/' + tweet.id_str)
                if(tweet.place.country_code=="IN" ):
                        api.update_status(status="@MFIndia Help Required for Missing Child https://www.twitter.com/"+ tweet.user.screen_name+'/status/' + tweet.id_str)
                    elif(prediction[0]==1):
                        api.update_status(status="@MFIndia Help Required for Lost Child https://www.twitter.com/"+ tweet.user.screen_name+'/status/' + tweet.id_str)
                if(tweet.place!=None and tweet.place.country_code=="US" and tweet.place.name=="Washington"):
                    if(prediction[0]==0):
                        api.update_status(status="@DCPoliceDept Help Required for Missing Child https://www.twitter.com/"+ tweet.user.screen_name+'/status/' + tweet.id_str)
                    elif(prediction[0]==1):
                        api.update_status(status="@DCPoliceDept Help Required for Lost Child https://www.twitter.com/"+ tweet.user.screen_name+'/status/' + tweet.id_str)
                if(tweet.place!=None and tweet.place.country_code=="US" and tweet.place.name=="McMinnville"):
                    if(prediction[0]==0):
                        api.update_status(status="@MacPolice Help Required for Missing Child https://www.twitter.com/"+ tweet.user.screen_name+'/status/' + tweet.id_str)
                    elif(prediction[0]==1):
                        api.update_status(status="@MacPolice Help Required for Lost Child https://www.twitter.com/"+ tweet.user.screen_name+'/status/' + tweet.id_str)
                if(prediction[0]==0):
                   tweet1_data = {"id":tweet.id_str,"username":tweet.user.screen_name,"text":tweet.full_text}
                   result=tweet1.insert_one(tweet1_data)
                   print(result.inserted_id)
    except tweepy.TweepError as e:
        print(e.reason)

    except StopIteration:
        break
