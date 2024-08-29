#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <cstring>
#include <string>
#include <thread>
#include <vector>
#include <utility>
#include <unordered_set>
#include <sstream>
#include <algorithm>
#include <random>

#define PORT 5555

using namespace std;

class User;
class Video;

vector<Video> videos;
vector<User> users;

class Video {
public:
    std::string id;
    int views;
    std::vector<std::pair<std::string, int>> recommendations;

    Video(const std::string& id, int views) : id(id), views(views) {}

    void addRecommendation(const User& user);

    void addOneRecommendation(const Video& userVideo);

    // Method to display video details
    void display() const {
        std::cout << "Video ID: " << id << ", Views: " << views << "\nRecommendations:\n";
        for (const auto& recommendation : recommendations) {
            std::cout << "  Video ID: " << recommendation.first << ", Score: " << recommendation.second << "\n";
        }
    }
};

class User {
public:
    // Attributes
    std::string id;
    std::unordered_set<std::string> watchedVideos;

    // Constructor
    User(const std::string& id) : id(id) {}

    // Method to add a watched video
    void addWatchedVideo(const std::string& videoId) {
        if (watchedVideos.insert(videoId).second) {
            
        } else {
            
        }
    }

    void addRecommendation(const Video& watchedVideo) {
        for (const auto& videoId : watchedVideos) {
            Video* foundVideo = nullptr;
            for (auto& video : videos) {
                if (video.id == videoId) {
                    foundVideo = &video;
                    break;
                }
            }
            foundVideo->addOneRecommendation(watchedVideo);
        }
    }

    // Method to display user details
    void display() const {
        std::cout << "User ID: " << id << "\nWatched Videos:\n";
        for (const auto& videoId : watchedVideos) {
            std::cout << "  " << videoId << "\n";
        }
    }
};

// Definition of addRecommendation method
void Video::addRecommendation(const User& user) {
    for (const string& userVideo : user.watchedVideos) {
        bool found = false;
        
        // Search for the string in the vector
        for (auto& video : recommendations) {  // Use auto& to modify the elements
            if (video.first == userVideo) {
                video.second += 1; // Increment the integer value
                found = true;
                break;
            }
        }

        // If the string was not found in the vector, add it with integer value 1
        if (!found) {
            recommendations.emplace_back(userVideo, 1);
        }
    }
}

void Video::addOneRecommendation(const Video& userVideo) {
    bool found = false;
        
    // Search for the string in the vector
    for (auto& video : recommendations) {  // Use auto& to modify the elements
        if (video.first == userVideo.id) {
            video.second += 1; // Increment the integer value
            found = true;
            break;
        }
    }

    // If the string was not found in the vector, add it with integer value 1
    if (!found) {
        recommendations.emplace_back(userVideo.id, 1);
    }
}


void init_db(string input) {
    std::stringstream ss(input);
    std::string videoData;

    // Split the string by ';' to get each video data
    while (std::getline(ss, videoData, ';')) {
        std::stringstream videoStream(videoData);
        std::string videoId;
        std::string viewsStr;

        // Split each video data by ':' to get the video ID and views
        if (std::getline(videoStream, videoId, ':') && std::getline(videoStream, viewsStr, ':')) {
            int views = std::stoi(viewsStr); // Convert views to integer
            videos.emplace_back(videoId, views); // Create a Video object and add it to the list
        }
    }
}

string getRandomVideos() {
    return "random";
}

string get_recommendation(string input) {
    string pid = input.substr(4);

    Video* foundVideo = nullptr;
    for (Video& video : videos) {
        if (video.id == pid) {
            foundVideo = &video;
            break;
        }
    }
    if (!foundVideo) {
        videos.emplace_back(pid, 0);
        foundVideo = &videos.back();
    }

    vector<pair<string, int>> vec = foundVideo->recommendations;

    sort(vec.begin(), vec.end(), [](const pair<string, int> &a, const pair<string, int> &b) {
        return a.second > b.second;
    });

    vector<pair<string, int>> top10(vec.begin(), vec.begin() + min<size_t>(vec.size(), 10));

    auto rng = std::default_random_engine {};
    std::shuffle(std::begin(videos), std::end(videos), rng);


    for (const Video& video : videos) {
        if (top10.size() >= 10) {
            break;
        }
        bool appears = false;
        for (pair<string,int> pair : vec) {
            if (pair.first == video.id) {
                appears = true;
                break;
            }
        }
        if (!appears) top10.emplace_back(video.id, 0);
    }

    string message = "";
    for (pair<string, int> pair : top10) {
        message += pair.first + ";";
    }
    if (message.size() > 0) message = message.substr(0, message.size() - 1);

    return message;
}

string handle_view(string input) {
    // Find the position of "USER:" and "VIDEO:"
    size_t userPos = input.find("USER:");
    size_t videoPos = input.find("VIDEO:");

    // Extract the userId and videoId
    if (userPos != std::string::npos && videoPos != std::string::npos) {
        // Calculate the starting position of userId and videoId
        size_t userIdStart = userPos + 5; // length of "USER:"
        size_t videoIdStart = videoPos + 6; // length of "VIDEO:"

        // Extract userId and videoId
        std::string userId = input.substr(userIdStart, videoPos - userIdStart);
        std::string videoId = input.substr(videoIdStart);


        Video* foundVideo = nullptr;
        for (auto& video : videos) {
            if (video.id == videoId) {
                foundVideo = &video;
                break;
            }
        }
        if (!foundVideo) {
            videos.emplace_back(videoId, 0);
            foundVideo = &videos.back();
        }

        foundVideo->views++;

        User* foundUser = nullptr;
        for (auto& user : users) {
            if (user.id == userId) {
                foundUser = &user;
                break;
            }
        }
        if (!foundUser) {
            if (userId == "0") return "success not logged in";
            users.emplace_back(userId);
            foundUser = &users.back();
        }

        foundVideo->addRecommendation(*foundUser);
        foundUser->addWatchedVideo(videoId);
        foundUser->addRecommendation(*foundVideo);

        return "success";
    } else {
        std::cout << "Invalid input format." << std::endl;
        return "failure";
    }
}

void handle_client(int client_sock) {
    char buffer[4096];
    int expected_data_len = sizeof(buffer);

    while (true) {
        int read_bytes = recv(client_sock, buffer, expected_data_len, 0);
        if (read_bytes == 0) {
            // Connection is closed
            break;
        } else if (read_bytes < 0) {
            perror("error reading from client");
            break;
        } else {
            buffer[read_bytes] = '\0'; // Null-terminate the received data
            string input(buffer);
            
            string message;
            if (input.substr(0, 4) == "USER") {
                message = handle_view(input);
            } else if (input.substr(0,3) == "PID") {
                message = get_recommendation(input);
            } else {
                init_db(input);

                message = "success";
            }
            int sent_bytes = send(client_sock, message.c_str(), message.length(), 0);
            if (sent_bytes < 0) {
                perror("error sending to client");
                break;
            }
        }
    }

    close(client_sock);
}

int main() {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
        perror("error creating socket");
        return 1;
    }

    struct sockaddr_in sin;
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;
    sin.sin_port = htons(PORT);

    if (bind(sock, (struct sockaddr*)&sin, sizeof(sin)) < 0) {
        perror("error binding socket");
        close(sock);
        return 1;
    }

    if (listen(sock, 5) < 0) {
        perror("error listening to a socket");
        close(sock);
        return 1;
    }

    cout << "Server is listening on port " << PORT << endl;

    while (true) {
        struct sockaddr_in client_sin;
        unsigned int addr_len = sizeof(client_sin);
        int client_sock = accept(sock, (struct sockaddr*)&client_sin, &addr_len);
        if (client_sock < 0) {
            perror("error accepting client");
            continue; // Don't exit, continue accepting new clients
        }

        // Create a new thread to handle the client
        thread client_thread(handle_client, client_sock);

        // Detach the thread so it runs independently
        client_thread.detach();
    }

    close(sock);
    return 0;
}
