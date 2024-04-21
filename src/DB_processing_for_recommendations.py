import sqlite3
import pandas as pd
from rank_bm25 import BM25Okapi
import nltk
import string

# Download necessary NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

# Function to preprocess text
def preprocess(text):
    if not text:
        return []
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    words = nltk.word_tokenize(text)
    stop_words = set(nltk.corpus.stopwords.words('english'))
    words = [word for word in words if word not in stop_words]    
    return words

def min_max_scale(scores, min_val, max_val):
    min_score = min(scores)
    max_score = max(scores)
    if max_score - min_score == 0:  # Avoid division by zero if all scores are the same
        return [min_val if score <= min_val else max_val for score in scores]
    scaled_scores = [(score - min_score) / (max_score - min_score) * (max_val - min_val) + min_val for score in scores]
    return scaled_scores

# Function to display BM25 scores for a document in each corpus
def scale_and_display_scores(doc_index, min_val=0, max_val=5):
    for column in columns:
        raw_scores = bm25_objects[column].get_scores(corpora[column][doc_index])
        scaled_scores = min_max_scale(raw_scores, min_val, max_val)
        print(f"Scaled scores for {column}:")
        print(scaled_scores)

# Connect to SQLite database
conn = sqlite3.connect('users.db')
query = "SELECT ethnicity, job, location, religion, sign, speaks, essay0, essay1, essay2, essay3, essay4, essay5, essay6, essay7, essay8, essay9 FROM users LIMIT 100"
df = pd.read_sql_query(query, conn)
conn.close()

# Preprocess essays by concatenating them and then preprocessing
df['essays_concatenated'] = df[['essay0', 'essay1', 'essay2', 'essay3', 'essay4', 'essay5', 'essay6', 'essay7', 'essay8', 'essay9']].fillna('').agg(' '.join, axis=1)
df['essays_concatenated'] = df['essays_concatenated'].apply(preprocess)

# Initialize dictionaries to hold BM25 objects and corpora
bm25_objects = {}
corpora = {}

# Columns to calculate BM25 on
columns = ['ethnicity', 'job', 'location', 'religion', 'sign', 'speaks', 'essays_concatenated']

# Calculate BM25 for each column
for column in columns:
    if column != 'essays_concatenated':  # Handle categorical data
        df[column] = df[column].fillna('').apply(lambda x: x.split())
    corpus = df[column].tolist()
    corpora[column] = corpus
    bm25 = BM25Okapi(corpus)
    bm25_objects[column] = bm25




# Example usage
scale_and_display_scores(0)  # Display BM25 scores for the first user across all columns
