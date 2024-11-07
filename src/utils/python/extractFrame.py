import os
import cv2

def extract_frames_from_folder(folder_path):
    for file in os.listdir(folder_path):
        # verifica se é um arquivo de video mp4
        if not file.endswith('.mp4'):
            continue
        #verificar se o arquivo jpg já existe
        if os.path.exists(folder_path + file.split('.')[0] + '.jpg'):
            continue
        
        video = cv2.VideoCapture(folder_path + file)
        ret, frame = video.read()
        if ret:
            cv2.imwrite(folder_path + file.split('.')[0] + '.jpg', frame)
        video.release()

if __name__ == '__main__':
    folder_path = '/videos' # path to the folder with the videos
    for recording_folders in os.listdir(folder_path):
        # verifica se é uma pasta
        if os.path.isdir(folder_path + '/' + recording_folders):
            extract_frames_from_folder(folder_path + '/' + recording_folders + '/')