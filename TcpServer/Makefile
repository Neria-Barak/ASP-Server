# Define the compiler
CXX = g++

# Define the target executable name
TARGET = server

# Define the source files
SRCS = server.cpp

# Define the object files (replace .cpp with .o in SRCS)
OBJS = $(SRCS:.cpp=.o)

# Default target
all: $(TARGET)

# Link the object files to create the executable
$(TARGET): $(OBJS)
	$(CXX) -o $(TARGET) $(OBJS)

# Compile the .cpp files into .o files
%.o: %.cpp
	$(CXX) -c $< -o $@

# Clean target to remove object files and executable
clean:
	rm -f $(OBJS) $(TARGET)
